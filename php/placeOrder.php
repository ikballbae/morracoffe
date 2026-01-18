<?php
/* File: php/placeOrder.php */

// 1. LOAD CONFIG
// Cukup panggil file ini. Library & Server Key otomatis dimuat.
require_once 'config.php';

// 2. MENANGKAP DATA DARI FRONTEND (Alpine.js)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validasi data
if(empty($data)) {
    http_response_code(400);
    echo "Error: Data pesanan tidak diterima.";
    exit();
}

// 3. MENYUSUN PARAMETER TRANSAKSI
$params = array(
    'transaction_details' => array(
        'order_id' => uniqid(), // ID Unik
        'gross_amount' => (int)$data['grandTotal'],
    ),
    'customer_details' => array(
        'first_name' => $data['customer']['name'],
        'email'      => $data['customer']['email'],
        'phone'      => $data['customer']['phone'],
    ),
    'item_details' => $data['items']
);

// 4. MENDAPATKAN SNAP TOKEN
try {
    $snapToken = \Midtrans\Snap::getSnapToken($params);
    echo $snapToken;
} catch (Exception $e) {
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}
?>