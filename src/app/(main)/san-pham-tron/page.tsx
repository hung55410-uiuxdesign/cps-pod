// import {WidgetCart} from "@/components/layout/common/widget-cart";
// import {Ellipsis, Package, Plus} from "lucide-react";
// import Header from "@/components/utils/Header";
// import {Button} from "@/components/ui/button";
// import Link from "next/link";
// import ProductList from "@/components/features/lists/ProductList";
//
// export default async function Page() {
//     await new Promise(resolve => setTimeout(resolve, 4000));
//     return (
//         <div className={'flex flex-col gap-8'}>
//             <div className={'grid lg:grid-cols-4 grid-cols-2 gap-4'}>
//                 <WidgetCart
//                     title={'Sản phẩm'}
//                     icon={<Package size={20} strokeWidth={1.25} />}
//                     content={'1.256'}
//                     ratio={'+ 16.8%'}
//                     showProgress={true}
//                 />
//                 <WidgetCart
//                     title={'Đơn hàng'}
//                     icon={<Package size={20} strokeWidth={1.25} />}
//                     content={'1.256'}
//                     ratio={'+ 16.8%'}
//                     showProgress={true}
//                 />
//                 <WidgetCart
//                     title={'Doanh thu'}
//                     icon={<Package size={20} strokeWidth={1.25}  />}
//                     content={'1.256'}
//                     ratio={'+ 16.8%'}
//                     showProgress={true}
//                 />
//                 <WidgetCart
//                     title={'Khách hàng'}
//                     icon={<Package size={20} strokeWidth={1.25}  />}
//                     content={'1.256'}
//                     ratio={'+ 16.8%'}
//                     showProgress={true}
//                 />
//             </div>
//             <div className={'flex flex-row gap-3 items-end justify-between'}>
//                 <Header title={'Sản phẩm trơn'} caption={'Manage your product catalog and inventory'} />
//                 <div className={'flex flex-row gap-3'}>
//                     <Link href={'/san-pham-tron/them-san-pham-tron'}>
//                         <Button className={'rounded-xl h-10 bg-muted cursor-pointer'} variant={'outline'}>
//                             <Plus />
//                             Tạo sản phẩm
//                         </Button>
//                     </Link>
//                     <Button className={'rounded-xl h-10 cursor-pointer'} variant={'default'}>
//                         Thêm DS sản phẩm
//                     </Button>
//                     <Button className={'rounded-xl bg-muted w-10 h-10 cursor-pointer'} variant={'outline'} size={"icon"}>
//                         <Ellipsis />
//                     </Button>
//                 </div>
//             </div>
//             <ProductList />
//         </div>
//     )
// }