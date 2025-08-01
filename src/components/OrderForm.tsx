'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreditCard, Lock, Mail, Link as LinkIcon, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, CustomPackage, OrderData } from '@/types'
import { formatPrice, formatNumber } from '@/lib/utils'

const orderSchema = z.object({
    targetUrl: z.string().url('Please enter a valid URL'),
    email: z.string().email('Please enter a valid email address'),
    name: z.string().min(1, 'Please enter a name for your content').max(100, 'Name is too long')
})

type OrderForm = z.infer<typeof orderSchema>

interface OrderFormProps {
    selectedPackage?: Package
    customPackage?: CustomPackage
    onSubmit: (data: OrderData) => void
    isLoading?: boolean
}

export function OrderForm({ selectedPackage, customPackage, onSubmit, isLoading }: OrderFormProps) {
    const t = useTranslations('order')
    const [isProcessing, setIsProcessing] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<OrderForm>({
        resolver: zodResolver(orderSchema)
    })

    const handleFormSubmit = async (data: OrderForm) => {
        setIsProcessing(true)
        try {
            const orderData: OrderData = {
                packageType: selectedPackage ? 'preset' : 'custom',
                package: selectedPackage,
                customPackage,
                targetUrl: data.targetUrl,
                email: data.email,
                name: data.name
            }
            await onSubmit(orderData)
        } finally {
            setIsProcessing(false)
        }
    }

    const totalPrice = selectedPackage?.price || customPackage?.price || 0
    const totalViews = selectedPackage?.views || customPackage?.views || 0

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="order-form">
                <div className="order-header">
                    <h2 className="order-title">
                        <CreditCard size={20} />
                        {t('title')}
                    </h2>
                    <p className="order-description">
                        Complete your purchase securely
                    </p>
                </div>

                <div className="order-form-content">
                    {/* Order Summary */}
                    <div className="order-summary">
                        <h3 className="summary-title">Order Summary</h3>
                        <div className="summary-row">
                            <span>Package:</span>
                            <span>{selectedPackage?.name || 'Custom Package'}</span>
                        </div>
                        <div className="summary-row">
                            <span>Views:</span>
                            <span>{formatNumber(totalViews)}</span>
                        </div>
                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span className="total-price">{formatPrice(totalPrice)}</span>
                        </div>
                    </div>

                    {/* Order Form */}
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-group">
                            <label className="form-label">
                                <Type size={16} />
                                {t('contentName')}
                            </label>
                            <Input
                                {...register('name')}
                                placeholder={t('contentNamePlaceholder')}
                                type="text"
                                className={`form-input ${errors.name ? 'error' : ''}`}
                            />
                            {errors.name && (
                                <p className="form-error">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <LinkIcon size={16} />
                                {t('targetUrl')}
                            </label>
                            <Input
                                {...register('targetUrl')}
                                placeholder={t('targetUrlPlaceholder')}
                                type="url"
                                className={`form-input ${errors.targetUrl ? 'error' : ''}`}
                            />
                            {errors.targetUrl && (
                                <p className="form-error">{errors.targetUrl.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Mail size={16} />
                                {t('email')}
                            </label>
                            <Input
                                {...register('email')}
                                placeholder={t('emailPlaceholder')}
                                type="email"
                                className={`form-input ${errors.email ? 'error' : ''}`}
                            />
                            {errors.email && (
                                <p className="form-error">{errors.email.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="submit-button btn-primary"
                            disabled={isProcessing || isLoading}
                        >
                            {isProcessing || isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    {t('processing')}
                                </>
                            ) : (
                                <>
                                    <Lock size={16} />
                                    {t('payNow')} {formatPrice(totalPrice)}
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="order-disclaimer">
                        <p>
                            <Lock className="security-icon" size={12} />
                            {t('securePayment')}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
