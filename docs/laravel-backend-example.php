<?php

// Example Laravel Controller for handling BoostifyViews webhook requests
// Place this in app/Http/Controllers/ViewOrderController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ViewOrderController extends Controller
{
    /**
     * Create a new YouTube video watch task
     */
    public function createWatchVideoTask(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'target_url' => 'required|url',
            'service_type' => 'required|in:youtube',
            'views' => 'required|integer|min:100|max:10000',
            'email' => 'required|email',
            'payment_intent_id' => 'required|string',
            'session_id' => 'required|string',
            'amount_paid' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'status' => 'required|in:pending,processing,completed,failed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            // Create watch-video task in your database
            $task = WatchVideo::create([
                'video_url' => $request->target_url,
                'target_views' => $request->views,
                'current_views' => 0,
                'customer_email' => $request->email,
                'stripe_payment_intent' => $request->payment_intent_id,
                'stripe_session_id' => $request->session_id,
                'amount_paid' => $request->amount_paid,
                'currency' => $request->currency,
                'status' => $request->status,
                'created_at' => now(),
                'estimated_completion' => now()->addHours(24)
            ]);

            Log::info('YouTube watch task created', ['task_id' => $task->id, 'video_url' => $request->target_url]);

            return response()->json([
                'success' => true,
                'task_id' => $task->id,
                'message' => 'YouTube view task created successfully',
                'estimated_completion' => $task->estimated_completion
            ], 201);

        } catch (\Exception $e) {
            Log::error('Failed to create watch video task', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'error' => 'Failed to create task',
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Create a new website visit task
     */
    public function createVisitSiteTask(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'target_url' => 'required|url',
            'service_type' => 'required|in:website',
            'views' => 'required|integer|min:100|max:10000',
            'email' => 'required|email',
            'payment_intent_id' => 'required|string',
            'session_id' => 'required|string',
            'amount_paid' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'status' => 'required|in:pending,processing,completed,failed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            // Create visit-site task in your database
            $task = VisitSite::create([
                'website_url' => $request->target_url,
                'target_visits' => $request->views,
                'current_visits' => 0,
                'customer_email' => $request->email,
                'stripe_payment_intent' => $request->payment_intent_id,
                'stripe_session_id' => $request->session_id,
                'amount_paid' => $request->amount_paid,
                'currency' => $request->currency,
                'status' => $request->status,
                'created_at' => now(),
                'estimated_completion' => now()->addHours(48)
            ]);

            Log::info('Website visit task created', ['task_id' => $task->id, 'website_url' => $request->target_url]);

            return response()->json([
                'success' => true,
                'task_id' => $task->id,
                'message' => 'Website traffic task created successfully',
                'estimated_completion' => $task->estimated_completion
            ], 201);

        } catch (\Exception $e) {
            Log::error('Failed to create visit site task', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'error' => 'Failed to create task',
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Update task progress (for existing tasks)
     */
    public function updateWatchVideoProgress(Request $request, $id): JsonResponse
    {
        // Implementation for updating existing watch-video task
        // This would be called by your background workers
        
        $task = WatchVideo::findOrFail($id);
        
        $task->update([
            'current_views' => $request->current_views,
            'status' => $request->status,
            'updated_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'task' => $task
        ]);
    }

    /**
     * Update site visit progress (for existing tasks)
     */
    public function updateVisitSiteProgress(Request $request, $id): JsonResponse
    {
        // Implementation for updating existing visit-site task
        // This would be called by your background workers
        
        $task = VisitSite::findOrFail($id);
        
        $task->update([
            'current_visits' => $request->current_visits,
            'status' => $request->status,
            'updated_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'task' => $task
        ]);
    }
}
