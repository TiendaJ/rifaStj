'use client';

import { useEffect, useRef } from 'react';

interface FacebookFeedProps {
    pageUrl?: string;
    height?: number;
    smallHeader?: boolean;
    hideCover?: boolean;
    showFacepile?: boolean;
    tabs?: string;
}

declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

export default function FacebookFeed({
    pageUrl = "https://www.facebook.com/jarelrepair",
    height = 500,
    smallHeader = false,
    hideCover = false,
    showFacepile = true,
    tabs = "timeline,events"
}: FacebookFeedProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to initialize Facebook SDK
        const initFacebookSDK = () => {
            if (window.FB) {
                window.FB.XFBML.parse(containerRef.current);
                return;
            }

            window.fbAsyncInit = function () {
                window.FB.init({
                    xfbml: true,
                    version: 'v18.0'
                });
            };

            // Load the SDK asynchronously
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s) as HTMLScriptElement;
                js.id = id;
                js.src = "https://connect.facebook.net/es_LA/sdk.js";
                fjs.parentNode?.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        };

        initFacebookSDK();
    }, [pageUrl]);

    return (
        <div className="w-full flex justify-center bg-white" ref={containerRef}>
            <div id="fb-root"></div>
            <div
                className="fb-page"
                data-href={pageUrl}
                data-tabs={tabs}
                data-width="500" // Maximum allowed width by plugin
                data-height={height}
                data-small-header={smallHeader}
                data-adapt-container-width="true"
                data-hide-cover={hideCover}
                data-show-facepile={showFacepile}
            >
                <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
                    <a href={pageUrl}>Jshop.pe</a>
                </blockquote>
            </div>
        </div>
    );
}
