'use client'

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { XCircle } from 'lucide-react';
import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";
import {Button} from "@/components/ui/button";

type ImageItem = {
    id: string;
    url: string;
};

const generateUniqueId = (url: string): string => {
    return `${url}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const SortableItem = ({ item, onRemoveImage }: { item: ImageItem, onRemoveImage: (id: string) => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: item.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative w-full h-full cursor-grab"
        >
            <img
                src={item.url}
                alt={`Preview ${item.id}`}
                className="w-full h-full object-cover rounded-xl border-[0.5px] border-line"
            />
            <Button
                onClick={() => {
                    onRemoveImage(item.id)
                }}
                data-dnd-ignore-drag
                className="absolute z-50 top-2 right-2 p-1 rounded-full bg-white/80"
            >
                <XCircle size={20} className="text-red-500" />
            </Button>
        </div>
    );
};

type Props = {
    value: string[];
    onChange: (value: string[]) => void;
};

export const SortableImageInputWidget = ({ value, onChange }: Props) => {
    const images: ImageItem[] = (value || []).map((url, index) => ({
        id: generateUniqueId(url + index),
        url,
    }))

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 250, tolerance: 10 },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = images.findIndex(item => item.id === active.id)
            const newIndex = images.findIndex(item => item.id === over.id)
            if (oldIndex !== -1 && newIndex !== -1) {
                const newImages = arrayMove(images, oldIndex, newIndex)
                onChange(newImages.map(img => img.url))
            }
        }
    }

    const handleUrlSelect = (url: string) => {
        onChange([...(value || []), url])
    }

    const handleRemoveImage = (idToRemove: string) => {
        const newImages = images.filter(item => item.id !== idToRemove)
        onChange(newImages.map(img => img.url))
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={images.map(item => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="grid grid-cols-6 gap-4">
                    {images.map(item => (
                        <SortableItem key={item.id} item={item} onRemoveImage={handleRemoveImage} />
                    ))}
                    <InputFieldWidgets
                        type="url"
                        onUrlSelect={handleUrlSelect}
                    />
                </div>
            </SortableContext>
        </DndContext>
    );
};