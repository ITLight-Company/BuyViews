'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Link } from '@/lib/navigation'

export const dynamic = 'force-static'

export default function SuccessPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState<{
        id: string;
        status: string;
        estimatedDelivery: string;
    } | null>(null)

    useEffect(() => {
        // Get search params on client side only
        const urlParams = new URLSearchParams(window.location.search)
        const sessionIdFromUrl = urlParams.get('session_id')

        if (sessionIdFromUrl) {
            // In a real application, you would fetch order details from your backend
            // For now, we'll simulate loading
            setTimeout(() => {
                setOrderDetails({
                    id: sessionIdFromUrl,
                    status: 'confirmed',
                    estimatedDelivery: '24 hours'
                })
                setIsLoading(false)
            }, 2000)
        } else {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom, #f0fdf4, #f8fafc)'
            }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Loader2 style={{
                        width: '2rem',
                        height: '2rem',
                        margin: '0 auto',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Processing your order...</p>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #f0fdf4, #f8fafc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 1rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxWidth: '28rem', margin: '0 auto', width: '100%' }}
                >
                    <div style={{
                        background: 'white',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb',
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{
                            borderBottom: '1px solid #e5e7eb',
                            paddingBottom: '1.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                background: '#dcfce7',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <CheckCircle style={{ width: '2rem', height: '2rem', color: '#10b981' }} />
                            </div>
                            <h1 style={{
                                fontSize: '1.875rem',
                                fontWeight: '700',
                                color: '#059669',
                                margin: '0'
                            }}>
                                Payment Successful!
                            </h1>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{
                                    color: '#6b7280',
                                    lineHeight: '1.6',
                                    margin: '0 0 1rem 0'
                                }}>
                                    Thank you for your purchase! Your order has been confirmed and processing will begin shortly.
                                </p>

                                {orderDetails && (
                                    <div style={{
                                        background: '#f0fdf4',
                                        padding: '1rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #bbf7d0'
                                    }}>
                                        <p style={{
                                            fontSize: '0.875rem',
                                            margin: '0 0 0.5rem 0',
                                            color: '#374151'
                                        }}>
                                            <strong>Order ID:</strong> {orderDetails.id.slice(-8)}
                                        </p>
                                        <p style={{
                                            fontSize: '0.875rem',
                                            margin: '0',
                                            color: '#374151'
                                        }}>
                                            <strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{
                                    fontWeight: '600',
                                    color: '#374151',
                                    fontSize: '1.125rem',
                                    margin: '0 0 1rem 0'
                                }}>
                                    What happens next?
                                </h3>
                                <ul style={{
                                    fontSize: '0.875rem',
                                    textAlign: 'left',
                                    listStyle: 'none',
                                    padding: '0',
                                    margin: '0',
                                    color: '#6b7280'
                                }}>
                                    <li style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#10b981',
                                            fontWeight: 'bold'
                                        }}>
                                            ✓
                                        </span>
                                        You&apos;ll receive a confirmation email shortly
                                    </li>
                                    <li style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#10b981',
                                            fontWeight: 'bold'
                                        }}>
                                            ✓
                                        </span>
                                        Our team will start processing your order
                                    </li>
                                    <li style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#10b981',
                                            fontWeight: 'bold'
                                        }}>
                                            ✓
                                        </span>
                                        You&apos;ll see results within 24 hours
                                    </li>
                                    <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#10b981',
                                            fontWeight: 'bold'
                                        }}>
                                            ✓
                                        </span>
                                        Track progress in your email updates
                                    </li>
                                </ul>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                width: '100%',
                                maxWidth: '100%'
                            }}>
                                <Link
                                    href="/"
                                    style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        padding: '0.875rem 1rem',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '0.75rem',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                        textAlign: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Return to Home
                                </Link>

                                <a
                                    href="mailto:contact@prizeflair.com"
                                    style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        padding: '0.875rem 1rem',
                                        background: 'white',
                                        color: '#374151',
                                        textDecoration: 'none',
                                        borderRadius: '0.75rem',
                                        fontWeight: '500',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'background-color 0.2s ease, transform 0.2s ease',
                                        border: '2px solid #e5e7eb',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                        textAlign: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f9fafb';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
