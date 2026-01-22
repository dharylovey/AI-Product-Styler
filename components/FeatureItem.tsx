import React from 'react';
import { StaggerItem } from './animations/StaggerContainer';

export interface Feature {
    name: string;
    description: string;
    icon: React.ReactNode;
}

interface FeatureItemProps {
    feature: Feature;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
    return (
        <StaggerItem className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                    {feature.icon}
                </div>
                {feature.name}
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">{feature.description}</p>
            </dd>
        </StaggerItem>
    );
};
