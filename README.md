# Inventory Restock Predictor

A Next.js application that predicts when inventory will run out based on past sales data and sends restock reminders.

## Features

- Predicts stockout dates based on current inventory and sales data
- Calculates optimal reorder dates considering supplier lead times
- Recommends order quantities based on demand forecasts
- Provides visual indicators for urgent vs. normal restock situations
- Responsive design that works on desktop and mobile devices
- Dashboard for monitoring all products at a glance
- Settings for customizing notification preferences
- Comprehensive documentation and API reference

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API and useState hooks
- **Testing**: Jest (planned)
- **Deployment**: Vercel (or any Node.js compatible platform)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd inventory-restock-predictor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

### Testing

To run tests:

```bash
npm test
```

## Project Structure

```
src/
├── app/                     # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── services/            # Business logic and data services
│   ├── __tests__/           # Test files
│   ├── about/               # About page
│   ├── api-docs/            # API documentation
│   ├── architecture/        # Technical architecture documentation
│   ├── dashboard/           # Dashboard page
│   ├── documentation/       # User documentation
│   ├── settings/            # Settings page
│   ├── actions.ts           # Server actions
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets
└── styles/                  # Global styles
```

## How It Works

The application uses a simple but effective algorithm to predict restocking needs:

1. **Days Until Stockout** = (Current Stock - Safety Stock) / Average Daily Sales
2. **Recommended Restock Date** = Current Date + (Days Until Stockout - Supplier Lead Time)
3. **Recommended Order Quantity** = Average Daily Sales × (Lead Time + Buffer Days)

The system also considers safety stock levels to prevent unexpected stockouts due to demand fluctuations.

## Customization

You can customize the following parameters in the calculation:

- **Safety Stock**: Minimum inventory level to maintain
- **Buffer Days**: Additional days added to the recommended order quantity calculation
- **Lead Time**: Time it takes for a supplier to fulfill an order

## API Endpoints

In a full implementation, the system would expose the following API endpoints:

- `GET /api/products` - Retrieve all products
- `POST /api/products` - Add a new product
- `GET /api/products/{id}` - Retrieve a specific product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product
- `GET /api/predictions/{id}` - Get restock prediction for a product
- `POST /api/notifications/restock` - Send restock alerts

## Deployment

The easiest way to deploy this application is with [Vercel](https://vercel.com), which provides seamless integration with Next.js.

For other deployment options, you can use any Node.js hosting platform that supports Next.js applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on the GitHub repository.