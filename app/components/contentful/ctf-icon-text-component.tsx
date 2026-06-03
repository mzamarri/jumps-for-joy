import { useFragment, type FragmentType } from "app/lib/gql/client"
import { graphql } from "app/lib/gql/client"
import { useContentfulInspectorMode } from "@contentful/live-preview/react"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import { twMerge } from "tailwind-merge"

const IconTextComponentFieldsFragment = graphql(`
    fragment IconTextComponentFields on IconTextComponent {
        __typename
        sys {
            id
        }
        displayText
        lucideIconName
        lucideIconColor
        descriptionType
        text
        dimensionsLength
        dimensionsWidth
        dimensionsHeight
    }
`)

type CtfIconTextComponentProps = {
    content: FragmentType<typeof IconTextComponentFieldsFragment>,
    containerClassName?: string,
    iconContainerClassName?: string,
    iconClassName?: string,
    textContainerClassName?: string,
    displayTextClassName?: string,
    descriptionClassName?: string
}

type Description = {
    text: string,
    dimensions: string 
}

type IconColor = "primary" | "secondary" | "accent"

export default function CtfIconTextComponent({
    content,
    containerClassName,
    iconContainerClassName,
    iconClassName,
    textContainerClassName,
    displayTextClassName,
    descriptionClassName
}: CtfIconTextComponentProps) {
    const data = useFragment(IconTextComponentFieldsFragment, content);
    const inspectorProps = useContentfulInspectorMode({ entryId: data.sys?.id });

    const description: Description = {
        text: data.text || "",
        dimensions: `${data.dimensionsLength}' L x ${data.dimensionsWidth}' W x ${data.dimensionsHeight}' H`
    }

    const iconColorClasses = {
        primary: "text-primary bg-primary/10",
        secondary: "text-secondary-foreground bg-secondary/30",
        accent: "text-accent bg-accent/15"
    }

    const descriptionKey: keyof Description | null =
        data.descriptionType === "text" || data.descriptionType === "dimensions"
            ? data.descriptionType
            : null;
    const descriptionFieldId = descriptionKey === "dimensions" ? "dimensionsLength" : "text";

    return (
        <div className={containerClassName}>
            <div className={twMerge("w-10 h-10 rounded-lg flex justify-center items-center shrink-0", iconColorClasses[data.lucideIconColor  as IconColor], iconContainerClassName)}>
                <DynamicIcon name={data.lucideIconName as IconName} className={twMerge("w-5 h-5", iconClassName)}/>
            </div>
            <div className={textContainerClassName}>
                <h1
                    className={displayTextClassName}
                    {...(inspectorProps({ fieldId: "displayText" }) ?? {})}
                >
                    {data.displayText}
                </h1>
                <p
                    className={descriptionClassName}
                    {...(inspectorProps({ fieldId: descriptionFieldId }) ?? {})}
                >
                    {descriptionKey ? description[descriptionKey] : ""}
                </p>
            </div>
        </div>
    )
}
