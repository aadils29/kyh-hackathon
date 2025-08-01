// API Configuration for Volunteer Platform
// This file contains configuration and helper functions for integrating with various volunteer APIs

const API_CONFIG = {
  // VolunteerMatch API (requires API key)
  volunteerMatch: {
    baseUrl: "https://api.volunteermatch.org/search",
    apiKey: process.env.VOLUNTEER_MATCH_API_KEY, // Set in environment variables
    endpoints: {
      search: "/search",
      opportunities: "/opportunities",
      organizations: "/organizations",
    },
  },

  // JustServe API (requires registration)
  justServe: {
    baseUrl: "https://www.justserve.org/api",
    apiKey: process.env.JUSTSERVE_API_KEY,
    endpoints: {
      opportunities: "/opportunities",
      search: "/search",
    },
  },

  // United Way API (varies by local chapter)
  unitedWay: {
    baseUrl: "https://api.unitedway.org",
    apiKey: process.env.UNITED_WAY_API_KEY,
    endpoints: {
      opportunities: "/volunteer-opportunities",
      organizations: "/organizations",
    },
  },

  // Local government APIs (examples)
  arlingtonCounty: {
    baseUrl: "https://www.arlingtonva.us/api",
    endpoints: {
      volunteers: "/volunteer-opportunities",
    },
  },

  // Geocoding for location services
  geocoding: {
    // Using OpenStreetMap Nominatim (free)
    nominatim: "https://nominatim.openstreetmap.org/search",
    // Alternative: Google Geocoding API (requires API key)
    google: {
      baseUrl: "https://maps.googleapis.com/maps/api/geocode/json",
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
};

// API Helper Functions
class VolunteerAPI {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
  }

  // Generic API call with error handling and caching
  async makeAPICall(url, options = {}) {
    const cacheKey = url + JSON.stringify(options);

    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

  // VolunteerMatch API integration
  async searchVolunteerMatch(location, filters = {}) {
    const params = new URLSearchParams({
      location: location,
      radius: filters.distance || 25,
      category: filters.category || "",
      resultsPerPage: 20,
      ...filters,
    });

    const url = `${API_CONFIG.volunteerMatch.baseUrl}?${params}`;

    try {
      return await this.makeAPICall(url, {
        headers: {
          Authorization: `Bearer ${API_CONFIG.volunteerMatch.apiKey}`,
        },
      });
    } catch (error) {
      console.warn("VolunteerMatch API unavailable, using fallback data");
      return this.getFallbackData(location, filters);
    }
  }

  // JustServe API integration
  async searchJustServe(location, filters = {}) {
    const params = new URLSearchParams({
      zipCode: this.extractZipCode(location),
      miles: filters.distance || 25,
      categoryId: this.mapCategoryToJustServe(filters.category),
      ...filters,
    });

    const url = `${API_CONFIG.justServe.baseUrl}/opportunities?${params}`;

    try {
      return await this.makeAPICall(url, {
        headers: {
          "X-API-Key": API_CONFIG.justServe.apiKey,
        },
      });
    } catch (error) {
      console.warn("JustServe API unavailable, using fallback data");
      return this.getFallbackData(location, filters);
    }
  }

  // United Way API integration
  async searchUnitedWay(location, filters = {}) {
    const params = new URLSearchParams({
      location: location,
      radius: filters.distance || 25,
      cause: filters.category || "",
      ...filters,
    });

    const url = `${API_CONFIG.unitedWay.baseUrl}/volunteer-opportunities?${params}`;

    try {
      return await this.makeAPICall(url, {
        headers: {
          Authorization: `Bearer ${API_CONFIG.unitedWay.apiKey}`,
        },
      });
    } catch (error) {
      console.warn("United Way API unavailable, using fallback data");
      return this.getFallbackData(location, filters);
    }
  }

  // Geocoding function
  async geocodeLocation(address) {
    const params = new URLSearchParams({
      q: address,
      format: "json",
      limit: 1,
    });

    const url = `${API_CONFIG.geocoding.nominatim}?${params}`;

    try {
      const result = await this.makeAPICall(url);
      if (result && result.length > 0) {
        return {
          lat: parseFloat(result[0].lat),
          lng: parseFloat(result[0].lon),
        };
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }

    return null;
  }

  // Helper functions
  extractZipCode(location) {
    const zipMatch = location.match(/\b\d{5}\b/);
    return zipMatch ? zipMatch[0] : "22201"; // Default to Arlington, VA
  }

  mapCategoryToJustServe(category) {
    const mapping = {
      education: 1,
      environment: 2,
      health: 3,
      community: 4,
      seniors: 5,
      animals: 6,
      disaster: 7,
      homeless: 8,
      youth: 9,
      arts: 10,
    };
    return mapping[category] || "";
  }

  // Fallback data when APIs are unavailable
  getFallbackData(location, filters) {
    // Return a subset of sample data based on filters
    const fallbackOpportunities = [
      {
        id: "fallback-1",
        title: "Community Cleanup Event",
        organization: "Local Environmental Group",
        category: filters.category || "environment",
        description: "Help clean up local parks and waterways.",
        date: "This Weekend",
        time: "9:00 AM - 1:00 PM",
        location: location,
        skills: "None required",
        contact: "info@localenv.org",
      },
    ];

    return { opportunities: fallbackOpportunities };
  }

  // Aggregate results from multiple APIs
  async searchAllSources(location, filters = {}) {
    const promises = [
      this.searchVolunteerMatch(location, filters),
      this.searchJustServe(location, filters),
      this.searchUnitedWay(location, filters),
    ];

    try {
      const results = await Promise.allSettled(promises);
      const successfulResults = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      // Combine and deduplicate results
      return this.combineResults(successfulResults);
    } catch (error) {
      console.error("Error searching all sources:", error);
      return this.getFallbackData(location, filters);
    }
  }

  combineResults(apiResults) {
    const combined = [];
    const seen = new Set();

    apiResults.forEach((result) => {
      if (result.opportunities) {
        result.opportunities.forEach((opp) => {
          const key = `${opp.title}-${opp.organization}`;
          if (!seen.has(key)) {
            seen.add(key);
            combined.push(opp);
          }
        });
      }
    });

    return { opportunities: combined };
  }
}

// Web scraping helpers for sites without APIs
class VolunteerScraper {
  constructor() {
    this.proxyUrl = "https://api.allorigins.win/get?url=";
  }

  async scrapeSite(url, selectors) {
    try {
      const response = await fetch(
        `${this.proxyUrl}${encodeURIComponent(url)}`
      );
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");

      const opportunities = [];
      const opportunityElements = doc.querySelectorAll(selectors.container);

      opportunityElements.forEach((element, index) => {
        const opportunity = {
          id: `scraped-${Date.now()}-${index}`,
          title: this.extractText(element, selectors.title),
          organization: this.extractText(element, selectors.organization),
          description: this.extractText(element, selectors.description),
          date: this.extractText(element, selectors.date),
          location: this.extractText(element, selectors.location),
          link: this.extractLink(element, selectors.link, url),
        };

        if (opportunity.title) {
          opportunities.push(opportunity);
        }
      });

      return opportunities;
    } catch (error) {
      console.error("Scraping failed:", error);
      return [];
    }
  }

  extractText(element, selector) {
    if (!selector) return "";
    const target = element.querySelector(selector);
    return target ? target.textContent.trim() : "";
  }

  extractLink(element, selector, baseUrl) {
    if (!selector) return "";
    const target = element.querySelector(selector);
    if (!target) return "";

    const href = target.getAttribute("href");
    if (!href) return "";

    return href.startsWith("http") ? href : new URL(href, baseUrl).href;
  }
}

// Export for use in main application
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VolunteerAPI, VolunteerScraper, API_CONFIG };
}
