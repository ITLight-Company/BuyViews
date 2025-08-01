'use client'

import { motion } from 'framer-motion'
import { XCircle, ArrowLeft } from 'lucide-react'
import { Link } from '@/lib/navigation'

export const dynamic = 'force-static'

export default function CancelPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #fef2f2, #f8fafc)',
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
                                background: '#fee2e2',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <XCircle style={{ width: '2rem', height: '2rem', color: '#dc2626' }} />
                            </div>
                            <h1 style={{
                                fontSize: '1.875rem',
                                fontWeight: '700',
                                color: '#dc2626',
                                margin: '0'
                            }}>
                                Payment Cancelled
                            </h1>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{
                                color: '#6b7280',
                                lineHeight: '1.6',
                                margin: '0 0 1rem 0'
                            }}>
                                Your payment was cancelled. No charges have been made to your account.
                            </p>

                            <p style={{
                                color: '#6b7280',
                                fontSize: '0.875rem',
                                lineHeight: '1.6',
                                margin: '0 0 1.5rem 0'
                            }}>
                                If you encountered any issues during checkout, please don&apos;t hesitate to contact our support team for assistance.
                            </p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{
                                    fontWeight: '600',
                                    color: '#374151',
                                    fontSize: '1.125rem',
                                    margin: '0 0 1rem 0'
                                }}>
                                    Need help?
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
                                            color: '#3b82f6',
                                            fontWeight: 'bold'
                                        }}>
                                            →
                                        </span>
                                        Contact our 24/7 support team
                                    </li>
                                    <li style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#3b82f6',
                                            fontWeight: 'bold'
                                        }}>
                                            →
                                        </span>
                                        Check our FAQ for common questions
                                    </li>
                                    <li style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#3b82f6',
                                            fontWeight: 'bold'
                                        }}>
                                            →
                                        </span>
                                        Try a different payment method
                                    </li>
                                    <li style={{ paddingLeft: '1rem', position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#3b82f6',
                                            fontWeight: 'bold'
                                        }}>
                                            →
                                        </span>
                                        Start over with a new order
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
                                        gap: '0.5rem',
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
                                    <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                                    Try Again
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
