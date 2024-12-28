<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TaskTest extends TestCase
{
    public function test_index_displays_user_tasks()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('tasks.index'));

        $response->assertStatus(200);
        $response->assertViewHas('tasks', [$task]);
    }

    public function test_store_creates_new_task()
    {
        $user = User::factory()->create();
        $taskData = ['name' => 'New Task'];

        $response = $this->actingAs($user)->post(route('tasks.store'), $taskData);

        $this->assertDatabaseHas('tasks', [
            'name' => 'New Task',
            'user_id' => $user->id,
        ]);
        $response->assertRedirect(route('tasks.index'));
    }

    public function test_update_changes_task_details()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);
        $updatedData = ['name' => 'Updated Task', 'complete' => true];

        $response = $this->actingAs($user)->put(route('tasks.update', $task), $updatedData);

        $this->assertDatabaseHas('tasks', [
            'name' => 'Updated Task',
            'complete' => true,
        ]);
        $response->assertRedirect(route('tasks.index'));
    }

    public function test_destroy_removes_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('tasks.destroy', $task));

        $this->assertSoftDeleted($task);
        $response->assertRedirect(route('tasks.index'));
    }

    public function test_store_requires_name()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->post(route('tasks.store'), []);

        $response->assertSessionHasErrors(['name']);
    }
}
