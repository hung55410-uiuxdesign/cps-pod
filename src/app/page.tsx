import {WidgetCart} from "@/components/layout/common/widget-cart";
import {Package} from "lucide-react";
import ChartWidget from "@/components/features/widgets/ChartWidget";

export default async function Page() {
    await new Promise(resolve => setTimeout(resolve, 4000));
    return (
        <div className={'flex flex-col gap-8'}>
            <div className={'grid lg:grid-cols-4 grid-cols-2 gap-4'}>
                <WidgetCart title={'Sản phẩm'} icon={<Package size={20} strokeWidth={1.25} />} content={'1.256'} ratio={'+ 16.8%'} />
                <WidgetCart title={'Đơn hàng'} icon={<Package size={20} strokeWidth={1.25} />} content={'1.256'} ratio={'+ 16.8%'} />
                <WidgetCart title={'Doanh thu'} icon={<Package size={20} strokeWidth={1.25}  />} content={'1.256'} ratio={'+ 16.8%'} />
                <WidgetCart title={'Khách hàng'} icon={<Package size={20} strokeWidth={1.25}  />} content={'1.256'} ratio={'+ 16.8%'} />
            </div>
            <ChartWidget />
        </div>
    )
}