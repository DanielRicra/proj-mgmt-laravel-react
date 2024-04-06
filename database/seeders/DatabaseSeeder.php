<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   */
  public function run(): void {
    User::factory()->create([
      'name' => 'Test',
      'email' => 'test@example.com',
      'password' => bcrypt('test1234'),
      'email_verified_at' => time(),
    ]);
    User::factory()->create([
      'name' => 'Daniel',
      'email' => 'daniel@example.com',
      'password' => bcrypt('daniel123'),
      'email_verified_at' => time(),
    ]);

    Project::factory()->count(21)->hasTasks(12)->create();
  }
}
