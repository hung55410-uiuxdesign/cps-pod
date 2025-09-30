import CreateProduct from "@/components/forms/blanks-products/create-product";
import {getProductByIdAction} from "@/lib/data/actions/product-actions";
import {ProductType} from "@/lib/types/product";

export default async function page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;

    const data: ProductType = await getProductByIdAction(slug);

    return (
        <div className={'flex flex-col gap-8 max-w-[1080px] mx-auto'}>
            <div className={'flex flex-row gap-3 items-center'}>
                <h1 className={'font-semibold text-tx-default text-[28px]'}>Chỉnh sửa sản phẩm</h1>
            </div>
            <CreateProduct product={data} />
        </div>
    )
}