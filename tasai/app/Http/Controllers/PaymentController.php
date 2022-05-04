<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Monolog\Logger;

class PaymentController extends Controller
{

    public function process_payment(Request $request) {
        $request->validate([
            "paymentMethodId" => "required",
            "amount" => "required",
            "course_id" => "required"
        ]);
        /*
         * Stripe charge API accepts payments in
         * the lowest possible denominator. In euro
         * case, this is in cents. Therefore, the conversion
         */
        $priceInCents = intval($request->amount * 100);
        try {
            $stripeCharge = $request->user()->charge($priceInCents, $request->paymentMethodId);
            return response(["paymentStatus"=>true, "paymentInformation"=>$stripeCharge], 200)->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        }
        catch (\Exception $exception)
        {
            Log::error("An error occurred while trying to pay: $exception");
            return response(["paymentStatus"=>false], 200)->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        }
    }
}
