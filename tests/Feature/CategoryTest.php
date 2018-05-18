<?php

namespace Tests\Feature;
use CodeShopping\Models\Category;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use DatabaseMigrations;

    public function testCreateNotValid() {
        $data = ['name' => ''];
        $response = $this->json('POST', '/api/categories', $data);
        $response->assertStatus(422);
    }

    public function testCreate() {
        $data = factory(Category::class)
            ->make()
            ->toArray();
        $response = $this->json('POST', '/api/categories', $data);
        $response->assertStatus(201)
                 ->assertJson(['data' => $data]);
    }

    public function testUpdateNotValid() {
        $data = factory(Category::class)
            ->create()
            ->toArray();
        unset($data['name']);
        $response = $this->json('PUT', '/api/categories/' . $data['id'], $data);
        $response->assertStatus(422);
    }

    public function testUpdate() {
        $data = factory(Category::class)
            ->create()
            ->toArray();
        $data['name'] = 'GG2';
        $response = $this->json('PUT', '/api/categories/' . $data['id'], $data);
        $response->assertStatus(200)
                 ->assertJson(['data' => $data]);
    }

    public function testDeleteNotValid() {
        $response = $this->json('DELETE', '/api/categories/100');
        $response->assertStatus(404);
    }

    public function testDelete() {
        $data = factory(Category::class)
            ->create()
            ->toArray();
        $response = $this->json('DELETE', '/api/categories/' . $data['id']);
        $response->assertStatus(204);
    }

    public function testList() {
        $data = factory(Category::class, 10)->create();
        $response = $this->get('/api/categories');
        $response->assertStatus(200)
                 ->assertJson(['data' => $data->toArray()]);
    }
}
