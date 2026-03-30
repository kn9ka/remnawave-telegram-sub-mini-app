'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Center, Stack, Text, Title } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function RedirectPage() {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const formattedUrl = searchParams.get('formattedUrl')
    const [secondsLeft, setSecondsLeft] = useState(5)

    useEffect(() => {
        if (!formattedUrl) {
            return
        }

        const timeoutId = setTimeout(() => {
            window.location.replace(formattedUrl)
        }, 5000)

        const intervalId = setInterval(() => {
            setSecondsLeft((current) => (current > 0 ? current - 1 : 0))
        }, 1000)

        return () => {
            clearTimeout(timeoutId)
            clearInterval(intervalId)
        }
    }, [formattedUrl])

    return (
        <Center style={{ minHeight: '100vh' }}>
            <Card padding="xl" radius="lg" maw={520} w="100%" mx={8}>
                <Stack align="center" gap="lg">
                    <Title order={6} ta="center">
                        {formattedUrl
                            ? t('main.page.component.redirect-message', {
                                  seconds: secondsLeft
                              })
                            : t('main.page.component.redirect-link-missing')}
                    </Title>

                    {formattedUrl && (
                        <Button
                            component="a"
                            href={formattedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="cyan"
                        >
                            {t('main.page.component.redirect-add-now')}
                        </Button>
                    )}

                    {!formattedUrl && (
                        <Text c="dimmed" ta="center">
                            {t('main.page.component.redirect-check-link')}
                        </Text>
                    )}
                </Stack>
            </Card>
        </Center>
    )
}
