import BackButton from "@/components/features/BackButton";
import {getProductByIdAction} from "@/lib/data/actions/product-actions";
import {DetailsProductSection} from "@/app/(main)/san-pham/[slug]/section/details-product-section";
import {Separator} from "@/components/ui/separator";

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;

    const data = await getProductByIdAction(slug);

    return (
        <div className={'w-full max-w-[1080px] mx-auto flex flex-col gap-8'}>
            <BackButton />
            <DetailsProductSection product={data} />
            <Separator />
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.description }}
            />
        </div>
    )
}