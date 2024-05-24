import { useEffect } from "react"
import { StylesConfig } from 'react-select'
import axios from '@lib/axios'

export const useClickOutside = (ref: any, handler: any) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }
        document.addEventListener("mousedown", listener)
        return () => {
            document.removeEventListener("mousedown", listener)
        }
    }, [ref, handler])
}

export const colourStyles: StylesConfig<any> = {
    control: (styles) => (
        { ...styles, backgroundColor: '#313133', border: '0', minHeight: '43px', padding: "2px 5px" }
    ),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => (
        {
            ...styles,
            backgroundColor: isDisabled
              ? ""
              : isSelected
                ? "#ff0015"
                : isFocused
                  ? "rgba(255, 0, 21, 0.75)"
                  : "#ffffff",
            color: isDisabled
                ? ""
                : isSelected
                ? "#ffffff"
                : isFocused
                    ? "#ffffff"
                    : "",
            cursor: isDisabled ? "not-allowed" : "default",
            fontSize: "14px"
        }
    ),
    input: (styles) => ({ ...styles, color: "white", fontSize: "14px" }),
    placeholder: (styles) => ({ ...styles, fontSize: "14px",color: "rgba(152, 166, 173, 0.3)" }),
    singleValue: (styles, { data }) => ({ ...styles, color: "white", fontSize: "14px" }),
}


export const getPresignedUrl = async (filename: string, filetype: string, jwt: string | undefined) => {
    const response = await axios.post('/r2/getPresignedUrl', 
      {
        filename: filename,
        filetype: filetype
      }, 
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }
    )
    
    if(response.status === 201) {
      return response.data
    }
}
  
// export const uploadImageToS3 = async (presignedUrl: string, imageFile: File) => {
//     const response = await fetch(presignedUrl, {
//       method: 'PUT',
//       body: imageFile,
//       headers: {
//         'Content-Type': imageFile.type,
//       },
//     })
    
//     if (response.ok) {
//       console.log('Image uploaded successfully')
//     } else {
//       console.error('Failed to upload image')
//     }
//     return response
// }

export const uploadImageToS3 = async (presignedUrl: string, imageFile: File, onProgress?: (event: ProgressEvent) => void) => {
  const response = await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', presignedUrl, true);
    xhr.setRequestHeader('Content-Type', imageFile.type);

    xhr.upload.onprogress = (event) => {
      if (onProgress) {
        onProgress(event);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(new Response('', { status: xhr.status, statusText: xhr.statusText }));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network request failed'));
    };

    xhr.send(imageFile);
  });

  if (response.ok) {
    console.log('Image uploaded successfully');
  } else {
    console.error('Failed to upload image');
  }

  return response;
}

export const uploadImageToR2 = async (token: string, file: File, onProgress?: (event: ProgressEvent) => void) => {
  const response = await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.open('POST', 'https://api.mytelevision.fr/api/v1/admin/r2/uploadfile', true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network request failed'));
    };

    xhr.upload.onprogress = (event) => {
      if (onProgress) {
        onProgress(event);
      }
    };

    xhr.send(formData);
  });
  
  return response;
}

export const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + ' B';
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(2) + ' KB';
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}

export const smartTrim = (string: string, maxLength: number) => {
  if (!string) return string;
  if (maxLength < 1) return string;
  if (string.length <= maxLength) return string;
  if (maxLength == 1) return string.substring(0,1) + '...';

  var midpoint = Math.ceil(string.length / 2);
  var toremove = string.length - maxLength;
  var lstrip = Math.ceil(toremove/2);
  var rstrip = toremove - lstrip;
  return string.substring(0, midpoint-lstrip) + '...' 
  + string.substring(midpoint+rstrip);
} 

export const dateToInputDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();  // "2024-04-29T09:16:54.067Z"
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (`0${date.getMonth() + 1}`).slice(-2)
  const day = (`0${date.getDate()}`).slice(-2)
  return `${year}-${month}-${day}`
}

export const getFieldArrayValue = (e: React.FormEvent<HTMLFormElement>, fieldName: string) => {
  const fieldOldValue = e.currentTarget[fieldName]
  const fieldValues = []
  if(fieldOldValue.length) {
      for (let i = 0; i < fieldOldValue.length; i++) {
          fieldValues.push(parseInt(fieldOldValue[i].value))
      }
  }
  else {
      fieldValues.push(parseInt(fieldOldValue.value))
  }

  return fieldValues
}

export const handleBulkGenresCreation = (genres: any, token: any) => {
  genres.forEach(async (genre: any) => {
      const res = await axios.post('/admin/genres/create', {
          name: genre.name,
          img_path: '/assets/images/4524df59b8e408fc35106fce1ddbc496fad69e47ac2f5110d4d61508c753c29e.jpg',
          status: true
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  })
}

export const handleBulkLanguesCreation = (langues: any, token: any) => {
  langues.forEach(async (langue: any) => {
      const res = await axios.post('/admin/lang/create', {
          name: langue.name,
          slug: langue.name.toLowerCase().replace(/ /g, '-'),
          img_path: '/assets/images/4524df59b8e408fc35106fce1ddbc496fad69e47ac2f5110d4d61508c753c29e.jpg',
          status: true
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  })
}