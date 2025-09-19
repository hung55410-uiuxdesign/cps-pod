import CreatePBasicsInfo from "@/components/forms/blanks-products/tab-contents/create-p-BasicsInfo";
import CreatePImageDescription from "@/components/forms/blanks-products/tab-contents/create-p-Image&Description";

type TabType = {
    name: string;
    value: string;
    content: (props: { onNextStep: () => void; onPrevStep: () => void }) => React.ReactNode;
}

export const TabsData: TabType[] = [
    {
        name: "Thông tin cơ bản",
        value: "basics-info",
        content: ({ onNextStep }) => <CreatePBasicsInfo onNextStepAction={onNextStep}/>
    },
    {
        name: "Thư viện ảnh & Mô tả",
        value: "images&description",
        content: ({ onNextStep, onPrevStep }) => <CreatePImageDescription onNextStepAction={onNextStep} onPrevStepAction={onPrevStep}/>
    },
    {
        name: "Thuộc tính",
        value: "attributes",
        content: () => <p>This is content 3</p>
    },
    {
        name: "Mặt in",
        value: "prints-area",
        content: () => <p>This is content 4</p>
    },
    {
        name: "Biến thể",
        value: "variants",
        content: () => <p>This is content 5</p>
    },
];