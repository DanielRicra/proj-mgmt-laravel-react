<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource {
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'description' => $this->description,
      'created_at' => (new Carbon($this->created_at))->toFormattedDateString(),
      'due_date' => (new Carbon($this->due_date))->toFormattedDateString(),
      'status' => $this->status,
      'image_path' => $this->image_path,
      'created_by' => new UserResource($this->createdBy), // To return user object instead of its id in project table
      'updated_by' => new UserResource($this->updatedBy), // To return user object instead of its id in project table
    ];
  }
}