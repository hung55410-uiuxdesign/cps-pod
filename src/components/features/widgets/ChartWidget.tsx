'use client'

import {ChartAreaInteractive} from "@/components/utils/Chart";
import {WidgetCartWithContainer} from "@/components/layout/common/widget-cart";

export default function ChartWidget() {
    return (
        <WidgetCartWithContainer
            title={"Xu hướng doanh thu và đơn đặt hàng"}
            caption={"Doanh thu hàng tháng và khối lượng đơn hàng trong 6 tháng qua"}
        >
            <ChartAreaInteractive />
        </WidgetCartWithContainer>
    )
}