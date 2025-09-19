import BackButton from "@/components/features/BackButton";
import {ImagePreviewWidget} from "@/components/features/widgets/ImagePreviewWidget";
import {ProductInfoWidget} from "@/components/features/widgets/ProductInfoWidget";

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    console.log(slug);

    return (
        <div className={'w-full max-w-[1080px] mx-auto flex flex-col gap-8'}>
            <BackButton />
            <div className={'grid grid-cols-2 gap-8'}>
                <ImagePreviewWidget />
                <ProductInfoWidget />
            </div>
        </div>
    )
}