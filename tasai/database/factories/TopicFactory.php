<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;

class TopicFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Topic::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition()
    {
        $courses = Course::pluck('id')->toArray();
        return [
            'title' => $this->faker->words(3, true),
            'topic_order' => $this->faker->numberBetween(1, 15),
            'short_description' => $this->faker->words(6, true),
            'theory' => $this->faker->sentences(4, true),
            'course_id' => $this->faker->randomElement($courses)
        ];
    }
}
