<?php

namespace Tests\Feature;

use CodeShopping\Models\Product;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProductInputTest extends TestCase
{
    use DatabaseMigrations;

    public function testCreateNotValid() {
        $product = factory(Product::class)
            ->create();
        $toPost = ['amount' => 'um'];
        $response = $this->json('POST', '/api/products/' . $product->id . '/inputs', $toPost);
        $response->assertStatus(422);
    }

    public function testCreate() {
        $value = 1;
        $product = factory(Product::class)
            ->create();
        $oldStock = $product->stock;
        $toPost = ['amount' => $value];
        $response = $this->json('POST', '/api/products/' . $product->id . '/inputs', $toPost);
        $response->assertStatus(201);
        $product->refresh();
        $this->assertEquals($product->stock, $oldStock + $value);
    }
}
