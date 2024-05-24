import 'devextreme/dist/css/dx.light.css'
 
import FileManager, { ItemView } from 'devextreme-react/file-manager'
import CustomFileSystemProvider from 'devextreme/file_management/custom_provider'

const fileSystem = [
    {
        name: "MyFolder.jpg",
        size: 1024,
        dateModified: "2019/05/08",
        thumbnail: "/thumbnails/images/jpeg.ico",
        isDirectory: true,
        items: [
            
        ]
    }
]

const customFileProvider = new CustomFileSystemProvider({
    // Function to get file system items
    getItems,
    // Functions to handle file operations
    createDirectory,
    deleteItem
})

export default function FileManagerPage() {
    function customizeIcon(fileManagerItem: any): any {
        if (fileManagerItem.isDirectory)
            return 'images/thumbnails/folder.svg';
        const fileExtension = fileManagerItem.getExtension();
        switch (fileExtension) {
            case '.txt':
                return 'images/thumbnails/doc-txt.svg';
            case '.rtf':
                return 'images/thumbnails/doc-rtf.svg';
            case '.xml':
                return 'images/thumbnails/doc-xml.svg';
        }
    }
    return (
        <FileManager 
            fileSystemProvider={fileSystem}
            // customizeThumbnail={customizeIcon}
        >
            <ItemView
                mode="thumbnails"
            />
        </FileManager>
    )
}

function getItems(parentDirectory: any): any {
    
}
function createDirectory(parentDirectory: any, name: string) {
    
}
function deleteItem(item: any) {
    
} 