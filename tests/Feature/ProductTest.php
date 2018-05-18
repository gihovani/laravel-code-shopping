<?php

namespace Tests\Feature;
use CodeShopping\Models\Product;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    public function testCreateNotValid() {
        $data = ['name' => ''];
        $response = $this->json('POST', '/api/products', $data);
        $response->assertStatus(422);
    }

    public function testCreate() {
        $data = factory(Product::class)
            ->make()
            ->toArray();
        $response = $this->json('POST', '/api/products', $data);
        $response->assertStatus(201)
                 ->assertJson(['data' => $data]);
    }

    public function testUpdateNotValid() {
        $data = factory(Product::class)
            ->create()
            ->toArray();
        unset($data['name']);
        $response = $this->json('PUT', '/api/products/' . $data['id'], $data);
        $response->assertStatus(422);
    }

    public function testUpdate() {
        $data = factory(Product::class)
            ->create()
            ->toArray();
        $data['name'] = 'GG2';
        $response = $this->json('PUT', '/api/products/' . $data['id'], $data);
        $response->assertStatus(200)
                 ->assertJson(['data' => $data]);
    }

    public function testDeleteNotValid() {
        $response = $this->json('DELETE', '/api/products/100');
        $response->assertStatus(404);
    }

    public function testDelete() {
        $data = factory(Product::class)
            ->create()
            ->toArray();
        $response = $this->json('DELETE', '/api/products/' . $data['id']);
        $response->assertStatus(204);
    }

    public function testList() {
        $data = factory(Product::class, 10)->create();
        $response = $this->get('/api/products');
        $response->assertStatus(200)
                 ->assertJson(['data' => $data->toArray()]);
    }
}
