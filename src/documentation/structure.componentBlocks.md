
## structure for blocks.
we need 3 files
   - blockname.admin.tsx
   - blockname.tsx
   - blockname.doc.readme.tsx


## blockname.admin.tsx

```javascript
    const preview = savedData ? (
        <TutorialComponent data={savedData} />
    ) : (
        <p>No data available. Please fill out the form.</p>
    );

    return (
        <AdminBlockTemplate
            title="Tutorial"
            description="Fill out the form and click save."
            form={form}
            savedData={preview}
            formRef={formRef}
            isSaved={isSaved}
        />
    );
```

## blockname.tsx

 - you need to export an object based on the interface for the block.

 ```javascript
    interface ExplanationProps {
        content: string;
        title: string;
        type: 'explanation';
    }

    interface ExplanationUsageProps {
        data: ExplanationProps
    }

    export const explanationObject = {
        content: '',
        title: '',
        type: 'explanation'
    }

    const ExplanationComponent: React.FC<ExplanationUsageProps> = ({ data }) => {
        return (
            <div className="mt-4">
            <Title title={ data.title } variant='subheading1' />
            <p className="leading-8">
                { data.content }
            </p>
            </div>
        );
    };
 ```