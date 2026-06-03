import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InfoOverlay from "./info-overlay";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

export type RentalGalleryImage = {
    id: string;
    url: string;
    alt: string;
};

type InspectorProps = ReturnType<typeof useContentfulInspectorMode>

type RentalImageGalleryProps = {
    images: RentalGalleryImage[];
    title: string;
    thumbnailImageId: string,
    galleryImageIds: string[],
    inspectorProps: InspectorProps
};

function GalleryPagination({
    images,
    selectedIndex,
    onSelect
}: {
    images: RentalGalleryImage[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}) {
    if (images.length <= 1) return null;

    return (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 lg:hidden">
            {images.map((image, index) => (
                <button
                    key={image.id}
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onSelect(index);
                    }}
                    aria-label={`Show image ${index + 1}`}
                    aria-current={selectedIndex === index ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all ${
                        selectedIndex === index
                            ? "w-2.5 bg-primary"
                            : "w-2.5 bg-primary/35 hover:bg-primary/55"
                    }`}
                />
            ))}
        </div>
    );
}

function MobileImageCarousel({
    images,
    thumbnailImageId,
    galleryImageIds,
    selectedIndex,
    onSelect,
    onOpen,
    inspectorProps
}: {
    images: RentalGalleryImage[];
    selectedIndex: number;
    thumbnailImageId: string,
    galleryImageIds: string[],
    onSelect: (index: number) => void;
    onOpen: (index: number) => void;
    inspectorProps: InspectorProps
}) {
    const startXRef = useRef<number | null>(null);
    const didDragRef = useRef(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        startXRef.current = event.clientX;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (startXRef.current === null) return;

        const nextOffset = event.clientX - startXRef.current;
        didDragRef.current = Math.abs(nextOffset) > 8;
        setDragOffset(nextOffset);
    };

    const finishDrag = () => {
        if (startXRef.current === null) return;

        const threshold = 48;

        if (dragOffset <= -threshold) {
            onSelect(Math.min(selectedIndex + 1, images.length - 1));
        } else if (dragOffset >= threshold) {
            onSelect(Math.max(selectedIndex - 1, 0));
        }

        startXRef.current = null;
        setDragOffset(0);
        setIsDragging(false);
    };

    return (
        <div className="relative lg:hidden">
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
                className="overflow-hidden rounded-xl touch-pan-y"
            >
                <div
                    className={`flex ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
                    style={{
                        transform: `translateX(calc(${-selectedIndex * 100}% + ${dragOffset}px))`
                    }}
                >
                    {images.map((image, index) => {
                        let props;
                        if (thumbnailImageId === image?.id ) {
                            props = inspectorProps({ fieldId: "thumbnailImage" })
                        } else if ( galleryImageIds?.includes(image?.id || "") ) {
                            props = inspectorProps({ fieldId: "galleryImages" })
                        }

                        return <button
                            key={image.id}
                            type="button"
                            onClick={() => {
                                if (didDragRef.current) {
                                    didDragRef.current = false;
                                    return;
                                }

                                onOpen(index);
                            }}
                            aria-label={`Open ${image.alt}`}
                            className="flex h-72 w-full shrink-0 items-center justify-center bg-muted p-8 pb-10 sm:h-96"
                            {...props ?? []}
                        >
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="h-full w-full object-contain"
                                draggable={false}
                            />
                        </button>
                    })}
                </div>
            </div>
            <GalleryPagination
                images={images}
                selectedIndex={selectedIndex}
                onSelect={onSelect}
            />
        </div>
    );
}

function OverlayThumbnailRail({
    images,
    selectedIndex,
    onSelect,
    getInspectorProps
}: {
    images: RentalGalleryImage[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    getInspectorProps: (id: string) => ReturnType<InspectorProps>;
}) {
    if (images.length <= 1) return null;

    return (
        <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
                <button
                    key={image.id}
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-label={`Show ${image.alt}`}
                    aria-current={selectedIndex === index ? "true" : undefined}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted p-1.5 transition-colors sm:h-20 sm:w-20 cursor-pointer ${
                        selectedIndex === index
                            ? "border-primary border-2"
                            : "border-border hover:border-primary/60"
                    }`}
                    {...getInspectorProps(image.id)}
                >
                    <img
                        src={image.url}
                        alt=""
                        className="h-full w-full object-contain"
                        draggable={false}
                    />
                </button>
            ))}
        </div>
    );
}

export default function RentalImageGallery({ images, title, galleryImageIds, thumbnailImageId, inspectorProps }: RentalImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [overlayOpen, setOverlayOpen] = useState(false);
    const selectedImage = images[selectedIndex] ?? images[0];
    const hasImages = images.length > 0;

    const openImage = (index: number) => {
        setSelectedIndex(index);
        setOverlayOpen(true);
    };

    const showPrevious = () => {
        setSelectedIndex(current => (current - 1 + images.length) % images.length);
    };

    const showNext = () => {
        setSelectedIndex(current => (current + 1) % images.length);
    };

    const getInspectorProps = (id: string) => {
        if (id === thumbnailImageId) return inspectorProps({ fieldId: "thumbnailImage" })

        if (galleryImageIds.includes(id)) return inspectorProps({ fieldId: "galleryImages" })
    }

    if (!hasImages) {
        return (
            <div className="flex h-72 w-full items-center justify-center rounded-xl bg-muted text-muted-foreground sm:h-96 lg:w-140 lg:shrink-0">
                No image available
            </div>
        );
    }

    return (
        <>
            <div className="w-full lg:w-140 lg:shrink-0">
                <MobileImageCarousel
                    images={images}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    onOpen={openImage}
                    thumbnailImageId={thumbnailImageId}
                    galleryImageIds={galleryImageIds}
                    inspectorProps={inspectorProps}
                />

                <div className="hidden gap-3 lg:grid lg:grid-cols-[5.5rem_1fr]">
                    <div className="hidden gap-2 lg:order-1 lg:flex lg:max-h-96 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
                        {images.slice(0, 5).map((image, index) => (
                            <button
                                key={image.id}
                                type="button"
                                onFocus={() => setSelectedIndex(index)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={() => openImage(index)}
                                aria-label={`Open ${image.alt}`}
                                className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted p-2 transition-colors lg:h-20 lg:w-full cursor-pointer ${
                                    selectedIndex === index
                                        ? "border-primary border-2"
                                        : "border-border hover:border-primary/60"
                                }`}
                                {...getInspectorProps(image?.id)}
                            >
                                <img
                                    src={image.url}
                                    alt=""
                                    className="h-full w-full object-contain"
                                    draggable={false}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="relative lg:order-2">
                        <button
                            type="button"
                            onClick={() => openImage(selectedIndex)}
                            className="flex h-72 w-full items-center justify-center rounded-xl bg-muted p-8 pb-10 hover:cursor-pointer sm:h-96 lg:pb-8"
                            aria-label={`Open ${selectedImage.alt}`}
                            {...getInspectorProps(selectedImage?.id)}
                        >
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.alt}
                                className="h-full w-full object-contain"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <InfoOverlay
                open={overlayOpen}
                onClose={() => setOverlayOpen(false)}
                title={title}
                summary={`${selectedIndex + 1} of ${images.length}`}
                contentClassName="space-y-4"
            >
                <div className="relative flex min-h-72 items-center justify-center rounded-xl p-4 sm:min-h-112  ">
                    {images.length > 1 ? (
                        <button
                            type="button"
                            onClick={showPrevious}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md hover:bg-card"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    ) : null}
                    <img
                        src={selectedImage.url}
                        alt={selectedImage.alt}
                        className="max-h-[50vh] w-full object-contain"
                        {...getInspectorProps(selectedImage.id)}
                    />
                    {images.length > 1 ? (
                        <button
                            type="button"
                            onClick={showNext}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md hover:bg-card"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    ) : null}
                </div>

                <OverlayThumbnailRail
                    images={images}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    getInspectorProps={getInspectorProps}
                />
            </InfoOverlay>
        </>
    );
}
