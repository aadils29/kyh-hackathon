# Proxiteer - Volunteer Opportunity Platform

A comprehensive volunteer opportunity discovery platform that connects people with meaningful volunteer work in their local communities.

## 🌟 Features

### Core Functionality

- **Smart Location Detection**: GPS-based location detection with manual input fallback
- **Advanced Filtering**: Filter by cause type, distance, time commitment, and date range
- **Interactive Map View**: Visual representation of opportunities with Leaflet maps
- **List View**: Detailed list format for easy browsing
- **Registration System**: Simple volunteer registration and contact management

### Enhanced Categories

- Education & Tutoring
- Environment & Conservation
- Health & Wellness
- Community Service
- Senior Care
- Animal Welfare
- Disaster Relief
- Homeless Services
- Youth Development
- Arts & Culture

### Data Sources Integration

- **VolunteerMatch API**: Large database of volunteer opportunities
- **JustServe API**: Community-focused volunteer matching
- **United Way APIs**: Local United Way chapter opportunities
- **Local Government Portals**: Municipal volunteer programs
- **Web Scraping Capability**: For sites without APIs

### Technical Features

- **Mobile-Responsive Design**: Optimized for mobile and desktop
- **Accessibility Features**: High contrast mode, large text options
- **Impact Tracking**: Track connections, hours, and organizations
- **Real-time Search**: Multi-source opportunity aggregation
- **Location Services**: Geocoding and distance calculations

## 🚀 Getting Started

### Prerequisites

- Modern web browser with JavaScript enabled
- Internet connection for map tiles and API calls

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aadils29/kyh-hackathon.git
   cd kyh-hackathon
   ```

2. Open `index.html` in your web browser or serve it using a local server:

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

### API Configuration

To enable real API integration, create a `.env` file with your API keys:

```env
VOLUNTEER_MATCH_API_KEY=your_volunteer_match_key
JUSTSERVE_API_KEY=your_justserve_key
UNITED_WAY_API_KEY=your_united_way_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 🗺️ API Integration

### Supported APIs

1. **VolunteerMatch API**

   - Endpoint: `https://api.volunteermatch.org/search`
   - Registration: [VolunteerMatch for Partners](https://www.volunteermatch.org/nonprofits/)
   - Features: Comprehensive opportunity database, organization profiles

2. **JustServe API**

   - Endpoint: `https://www.justserve.org/api`
   - Registration: Contact JustServe directly
   - Features: Community-focused opportunities, event management

3. **United Way APIs**

   - Varies by local chapter
   - Contact your local United Way for API access
   - Features: Local community programs, disaster response

4. **Local Government APIs**
   - Arlington County: `https://www.arlingtonva.us/api`
   - Contact your local government for volunteer portal APIs

### Web Scraping

For organizations without APIs, the platform includes web scraping capabilities:

- Respect robots.txt and rate limits
- Use CORS proxies for client-side scraping
- Parse common volunteer site structures
- Extract opportunity details and contact information

## 📱 Usage

### Finding Opportunities

1. **Set Location**: Use GPS detection or enter your location manually
2. **Apply Filters**: Choose categories, distance, time commitment, and dates
3. **Browse Results**: Switch between map and list views
4. **View Details**: Click on opportunities for more information

### Registration Process

1. Click "Apply Now" on any opportunity
2. Fill out the registration form with your details
3. Submit to connect with the organization
4. Track your volunteer hours and impact

### Accessibility Features

- Click the accessibility controls in the top-right corner
- Toggle high contrast mode for better visibility
- Enable large text mode for easier reading
- All interactive elements are keyboard accessible

## 🏗️ Architecture

### Frontend

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Responsive design with CSS Grid and Flexbox
- **JavaScript**: ES6+ features, async/await for API calls
- **Leaflet**: Interactive maps with OpenStreetMap tiles
- **Font Awesome**: Icons and visual elements

### Data Flow

1. User enters location and filters
2. Platform geocodes location if needed
3. Parallel API calls to multiple data sources
4. Results aggregated and deduplicated
5. Opportunities displayed on map and in list
6. User registration tracked for impact metrics

### File Structure

```
kyh-hackathon/
├── index.html          # Main application file
├── api-config.js       # API configuration and helpers
├── README.md          # This documentation
└── assets/            # Images and additional resources
```

## 🎯 Hackathon Implementation Strategy

### MVP Scope (4-8 hours)

- [x] Basic UI with location input and filtering
- [x] Sample data display with Arlington, VA focus
- [x] Map integration with Leaflet
- [x] Registration modal
- [x] Mobile-responsive design

### Extended Features (8-24 hours)

- [x] Multi-source data aggregation structure
- [x] Advanced filtering and search
- [x] Impact tracking and statistics
- [x] Accessibility features
- [ ] Real API integration (requires API keys)
- [ ] User profile system
- [ ] Organization dashboard

### Production Ready (24+ hours)

- [ ] Backend API development
- [ ] Database integration
- [ ] User authentication
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-city expansion

## 📊 Social Impact Features

### Impact Tracking

- **Volunteer Connections**: Track successful registrations
- **Hours Volunteered**: Aggregate volunteer time commitment
- **Partner Organizations**: Count of active volunteer opportunities
- **Geographic Reach**: Cities and communities served

### Accessibility

- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Visual Accessibility**: High contrast and large text options
- **Motor Accessibility**: Large click targets and touch-friendly design

### Community Building

- **Organization Profiles**: Detailed information about volunteer organizations
- **Volunteer Reviews**: Feedback system for opportunities
- **Impact Stories**: Showcase successful volunteer experiences
- **Social Sharing**: Share opportunities with friends and family

## 🔧 Development

### Local Development

1. Make changes to `index.html` for frontend modifications
2. Update `api-config.js` for API integration changes
3. Test across different devices and browsers
4. Validate accessibility with screen readers

### API Testing

Use the browser's developer console to test API functions:

```javascript
// Test geocoding
const api = new VolunteerAPI();
api.geocodeLocation("Arlington, VA").then(console.log);

// Test API aggregation
api.searchAllSources("22201", { category: "education" }).then(console.log);
```

### Performance Optimization

- **Caching**: API responses cached for 10 minutes
- **Lazy Loading**: Map tiles loaded on demand
- **Debouncing**: Search input debounced to reduce API calls
- **Image Optimization**: Use appropriate image formats and sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

### Code Style

- Use semantic HTML5 elements
- Follow CSS BEM methodology for class naming
- Use modern JavaScript (ES6+) features
- Include accessibility attributes (ARIA labels, alt text)
- Comment complex functions and API integrations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenStreetMap**: Free map tiles and geocoding services
- **Leaflet**: Excellent mapping library
- **Font Awesome**: Beautiful icons
- **Volunteer Organizations**: For making communities better
- **Hackathon Participants**: For inspiration and collaboration

## 📞 Support

For questions or support:

- Open an issue on GitHub
- Contact the development team
- Check the documentation and code comments

---

Built with ❤️ for communities everywhere. Let's make volunteering more accessible!
