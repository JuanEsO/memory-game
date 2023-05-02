import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const useImages = () => {
    const [cards, setCards] = useState([]);

    const fetchImages = async () => {
      const response = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20', { method: 'GET' })
      const data = await response.json()
      const uniqueImages = data.entries.slice(0, 6)       // reduce the unique images to 6
      const duplicateImages = [...uniqueImages, ...uniqueImages].sort(() => Math.random() - 0.5) // duplicate the images and shuffle them
      const images = duplicateImages.map((image) => {     // map the images to the format we need
        return {
          url: image.fields.image.url,
          id: image.fields.image.uuid,
          uuid: uuidv4()
        }
      })
      setCards(images)
      // console.log(images)
    }

    const reset = () => {
      try {
        fetchImages()
      } catch (error) {
        console.log(error)
      }
    }
    
    useEffect(() => {
        // get images from api
        try {
          fetchImages()
        } catch (error) {
          console.log(error)
        }
      }, [])
    
    return [cards, reset]
}

export default useImages