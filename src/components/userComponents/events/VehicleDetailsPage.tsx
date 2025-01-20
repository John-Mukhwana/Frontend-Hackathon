import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import type { Vehicle } from '../../types';
import Badge from '../../shared/Badge';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import { formatPrice } from '../../../utils/price';

// In a real app, this would come from an API
const getVehicleById = (id: string): Vehicle | undefined => {
  const vehicles = [
    {
      id: '1',
      name: 'Luxury Yacht 2024',
      type: 'boat',
      condition: 'new',
      price: 250000,
      images: [
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a',
        'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13',
        'https://images.unsplash.com/photo-1605281317010-fe5ffe798166'
      ],
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a',
      model: 'Ocean Master',
      year: 2024,
      specifications: [
        'Length: 45ft',
        '2x 450hp Motors',
        'Sleeps 8',
        'Full Kitchen',
        'GPS Navigation',
        'Radar System',
        'Fresh Water Capacity: 200 Gallons',
        'Fuel Capacity: 500 Gallons'
      ],
      description: 'Experience luxury on the water with this stunning 2024 Ocean Master yacht. Featuring state-of-the-art navigation systems, spacious accommodations, and powerful dual motors.',
      addedDate: '2024-03-10'
    }
  ];
  return vehicles.find(v => v.id === id);
};

export default function VehicleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const vehicle = id ? getVehicleById(id) : undefined;

  if (!vehicle) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Vehicle not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <img
              src={vehicle.images[selectedImage]}
              alt={vehicle.name}
              className="w-full aspect-video object-cover rounded-lg"
            />
          </Card>

          <div className="grid grid-cols-4 gap-2">
            {vehicle.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-lg overflow-hidden aspect-square ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${vehicle.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{vehicle.name}</h1>
                  <p className="text-gray-600">{vehicle.model} - {vehicle.year}</p>
                </div>
                <Badge variant={vehicle.condition === 'new' ? 'success' : 'default'}>
                  {vehicle.condition}
                </Badge>
              </div>

              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(vehicle.price)}
              </p>

              <Button className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </div>
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{vehicle.description}</p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {vehicle.specifications.map((spec, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-500">•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}