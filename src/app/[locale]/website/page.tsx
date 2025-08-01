'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PackageSelection } from '@/components/PackageSelection'
import { OrderForm } from '@/components/OrderForm'
import { Package, CustomPackage, OrderData } from '@/types'
import { websitePackages } from '@/lib/packages'
import { Button } from '@/components/ui/button'
import { Globe, ArrowLeft } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

type Step = 'packages' | 'order'

export default function WebsitePage() {
    const t = useTranslations('packages')
    const locale = useLocale()
    const [currentStep, setCurrentStep] = useState<Step>('packages')
    const [selectedPackage, setSelectedPackage] = useState<Package>()
    const [customPackage, setCustomPackage] = useState<CustomPackage>()

    const handlePackageSelect = (pkg: Package) => {
        setSelectedPackage(pkg)
        setCustomPackage(undefined)
    }

    const handleCustomPackageCreate = (pkg: CustomPackage) => {
        setCustomPackage(pkg)
        setSelectedPackage(undefined)
    }

    const handleOrderSubmit = async (orderData: OrderData) => {
        console.log('Website order submitted:', orderData)

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...orderData,
                    serviceType: 'website',
                    locale: locale,
                    customerInfo: {
                        email: orderData.email,
                        targetUrl: orderData.targetUrl,
                        name: orderData.name
                    }
                }),
            })

            if (response.ok) {
                const { url } = await response.json()
                window.location.href = url
            }
        } catch (error) {
            console.error('Payment error:', error)
        }
    }

    const handleBackToPackages = () => {
        setCurrentStep('packages')
        setSelectedPackage(undefined)
        setCustomPackage(undefined)
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-background py-24">
                <div className="container mx-auto px-4 text-center">
                    <Globe className="w-20 h-20 mx-auto mb-6 text-blue-500" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Website Traffic Packages
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Drive real visitors to your website and improve your online presence.
                        High-quality traffic from targeted audiences with detailed analytics.
                    </p>
                </div>
            </div>

            {currentStep === 'packages' && (
                <div className="container mx-auto px-4 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <PackageSelection
                            packages={websitePackages}
                            onPackageSelect={handlePackageSelect}
                            onCustomPackageCreate={handleCustomPackageCreate}
                            selectedPackage={selectedPackage}
                            selectedCustomPackage={customPackage}
                        />

                        {(selectedPackage || customPackage) && (
                            <div className="text-center">
                                <Button
                                    size="lg"
                                    onClick={() => setCurrentStep('order')}
                                    className="btn-primary"
                                >
                                    {t('proceedToOrder')}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}

            {currentStep === 'order' && (
                <div className="order-section">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="order-content space-y-12"
                    >
                        <div className="text-center">
                            <button
                                onClick={handleBackToPackages}
                                className="back-button"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Packages
                            </button>
                        </div>

                        <OrderForm
                            selectedPackage={selectedPackage}
                            customPackage={customPackage}
                            onSubmit={handleOrderSubmit}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    )
}
