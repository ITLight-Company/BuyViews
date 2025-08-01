<?php

// Example Laravel routes for BoostifyViews backend API
// Add these to routes/api.php in your Laravel backend

use App\Http\Controllers\ViewOrderController;

Route::prefix('api')->group(function () {
    
    // Routes for creating new tasks from Stripe webhook
    Route::post('/watch-videos', [ViewOrderController::class, 'createWatchVideoTask']);
    Route::post('/visit-sites', [ViewOrderController::class, 'createVisitSiteTask']);
    
    // Routes for updating existing tasks (used by background workers)
    Route::put('/watch-videos/{id}/update', [ViewOrderController::class, 'updateWatchVideoProgress']);
    Route::put('/visit-sites/{id}/update', [ViewOrderController::class, 'updateVisitSiteProgress']);
    
    // Optional: Routes for getting task status (for customer dashboard)
    Route::get('/watch-videos/{id}', [ViewOrderController::class, 'getWatchVideoTask']);
    Route::get('/visit-sites/{id}', [ViewOrderController::class, 'getVisitSiteTask']);
    
    // Optional: Routes for listing customer orders
    Route::get('/orders', [ViewOrderController::class, 'getCustomerOrders']);
});

/*
Database Migration Examples:

// Create watch_videos table
Schema::create('watch_videos', function (Blueprint $table) {
    $table->id();
    $table->string('video_url');
    $table->integer('target_views');
    $table->integer('current_views')->default(0);
    $table->string('customer_email');
    $table->string('stripe_payment_intent')->unique();
    $table->string('stripe_session_id')->unique();
    $table->decimal('amount_paid', 8, 2);
    $table->string('currency', 3);
    $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
    $table->timestamp('estimated_completion');
    $table->timestamps();
    
    $table->index(['customer_email', 'status']);
    $table->index('status');
});

// Create visit_sites table
Schema::create('visit_sites', function (Blueprint $table) {
    $table->id();
    $table->string('website_url');
    $table->integer('target_visits');
    $table->integer('current_visits')->default(0);
    $table->string('customer_email');
    $table->string('stripe_payment_intent')->unique();
    $table->string('stripe_session_id')->unique();
    $table->decimal('amount_paid', 8, 2);
    $table->string('currency', 3);
    $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
    $table->timestamp('estimated_completion');
    $table->timestamps();
    
    $table->index(['customer_email', 'status']);
    $table->index('status');
});
*/
