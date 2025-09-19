import CreateProduct from "@/components/forms/blanks-products/create-product";

export default async function page() {
    await new Promise(resolve => setTimeout(resolve, 4000));
    return (
        <div className={'flex flex-col gap-8 max-w-[1080px] mx-auto'}>
            <div className={'flex flex-row gap-3 items-center'}>
                <h1 className={'font-semibold text-tx-default text-[28px]'}>Tạo sản phẩm</h1>
            </div>
            <CreateProduct />
        </div>
    )
}