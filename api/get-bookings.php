<?php
// Development placeholder for get-bookings.php
// This file should exist on cPanel
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Sample booking data for development
$sampleBookings = [
    [
        'id' => 1,
        'source' => 'booking_form',
        'tourId' => 5,
        'name' => 'Mekong Delta Exploration',
        'price' => 129.00,
        'location' => 'Mekong Delta',
        'duration' => '2 days, 1 night',
        'firstName' => 'TRAN',
        'lastName' => 'LAM',
        'email' => 'lam@example.com',
        'phone' => '0562107691',
        'address' => 'Ha Noi',
        'departureDate' => '2025-06-14T01:00:00Z',
        'returnDate' => '2025-06-15T01:00:00Z',
        'numberOfTravelers' => 1,
        'travelersArray' => [['age' => 30, 'gender' => 'male']],
        'specialRequests' => '',
        'dietaryRestrictions' => '',
        'status' => 'pending',
        'createdAt' => '2025-06-11T10:00:00Z'
    ],
    [
        'id' => 2,
        'source' => 'booking_form',
        'tourId' => 2,
        'name' => 'Halong Bay Cruise',
        'price' => 199.00,
        'location' => 'Halong Bay',
        'duration' => '3 days, 2 nights',
        'firstName' => 'Sarah',
        'lastName' => 'Johnson',
        'email' => 'sarah.johnson@example.com',
        'phone' => '+1234567890',
        'address' => 'New York, USA',
        'departureDate' => '2025-06-20T08:00:00Z',
        'returnDate' => '2025-06-22T18:00:00Z',
        'numberOfTravelers' => 2,
        'travelersArray' => [
            ['age' => 32, 'gender' => 'female', 'firstName' => 'Sarah', 'lastName' => 'Johnson'],
            ['age' => 35, 'gender' => 'male', 'firstName' => 'John', 'lastName' => 'Johnson']
        ],
        'specialRequests' => 'Anniversary celebration',
        'dietaryRestrictions' => 'Vegetarian meals',
        'status' => 'confirmed',
        'createdAt' => '2025-06-10T14:30:00Z'
    ]
];

echo json_encode(['bookings' => $sampleBookings]);
?>
