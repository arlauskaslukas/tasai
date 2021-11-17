<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Assignment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $topics = Topic::pluck('id')->toArray();
        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->words(10, true),
            'deadline' => $this->faker->dateTime(),
            'topic_id' => $this->faker->randomElement($topics)
        ];
    }
}
