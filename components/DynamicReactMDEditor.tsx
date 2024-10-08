// components/DynamicReactMDEditor.tsx

'use client'; // Ensure this component is treated as a client-side component

import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box } from '@radix-ui/themes';

interface DynamicReactMDEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    colorMode?: 'light' | 'dark';
}

const DynamicReactMDEditor: React.FC<DynamicReactMDEditorProps> = ({ value, onChange, colorMode }) => {
    return (
        <Box className={`rounded-lg shadow-md p-2 transition-colors duration-300 ${colorMode === 'dark' ? 'bg-primaryDark' : 'bg-gray-600'}`}>
            <MDEditor
                data-color-mode={colorMode}
                value={value}
                onChange={onChange}
                height={400}
                preview="live"
                className="rounded-lg "
            />
        </Box>
    );
};

export default DynamicReactMDEditor;