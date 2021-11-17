<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'starts_at' => $this->faker->date(),
            'title' => $this->faker->words(3, true),
            'short_description' => $this->faker->words(6, true),
            'long_description' => $this->faker->sentences(3, true),
            'duration' => $this->faker->numberBetween(1,96),
            'cost' => $this->faker->randomFloat(2,19.99, 299.99)
        ];
    }
}
