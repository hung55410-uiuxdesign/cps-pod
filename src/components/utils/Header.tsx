type Props = {
    title: string;
    caption: string
}

export default function Header({title, caption}: Props) {
    return  (
        <div className={'flex flex-col gap'}>
            <p className={'text-xl text-tx-default font-semibold'}>{title}</p>
            <p className={'text-sm text-tx-muted'}>{caption}</p>
        </div>
    )
}