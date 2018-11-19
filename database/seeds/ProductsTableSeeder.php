<?php

use CodeShopping\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ProductsTableSeeder extends Seeder
{
    /**
     * @var Collection $allFakerPhotos ;
     */
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = \CodeShopping\Models\Category::all();
        $this->allFakerPhotos = $this->getFakerPhotos();
        $this->deleteAllPhotoInProductsPath();
        factory(Product::class, 30)
            ->make()
            ->each(function (Product $product) use ($categories) {
            $product = Product::createWithPhoto($product->toArray() + ['photo' => $this->getUploadedFile()]);
            $categoryId = $categories->random()->id;
            $product->categories()->attach($categoryId);
        });
    }

    private function deleteAllPhotoInProductsPath()
    {
        $path = Product::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function getFakerPhotos(): Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function getUploadedFile(): UploadedFile
    {
        /** @var SplFileInfo $photoFile */
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16) . '.' . $photoFile->getExtension()
        );

        return $uploadFile;
    }
}
