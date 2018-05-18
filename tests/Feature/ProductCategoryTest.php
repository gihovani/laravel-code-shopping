<?php

namespace Tests\Feature;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProductCategoryTest extends TestCase
{
    use DatabaseMigrations;

    public function testCreateNotValid() {
        $data = factory(Product::class)
            ->create()
            ->toArray();
        $toPost = ['categories' => [1]];
        $response = $this->json('POST', '/api/products/' . $data['id'] . '/categories', $toPost);
        $response->assertStatus(422);
    }

    public function testCreate() {
        $product = factory(Product::class)
            ->create()
            ->toArray();
        $category = factory(Category::class)
            ->create()
            ->toArray();
        $toPost = ['categories' => $category['id']];
        $response = $this->json('POST', '/api/products/' . $product['id'] . '/categories', $toPost);
        $response->assertStatus(201)
                 ->assertJson(['product' => $product, 'categories' => [$category]]);
    }

    public function testDelete() {
        $product = factory(Product::class)
            ->create()
            ->toArray();
        $category = factory(Category::class)
            ->create()
            ->toArray();
        $toPost = ['categories' => $category['id']];
        $this->json('POST', '/api/products/' . $product['id'] . '/categories', $toPost);
        $response = $this->json('DELETE', '/api/products/' . $product['id'] . '/categories/' . $category['id']);
        $response->assertStatus(204);

        ;
    }
}
