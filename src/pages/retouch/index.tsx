import { useCallback, useEffect, useRef } from 'react'
import { useSnackbar } from 'notistack'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useAppStore, useCropStore, useRetouchStore } from '@/stores'
import { createIDPhoto } from '@/uitls'
import { CloseButton, SaveButton, TextureBackground } from '@/components'
import ImagePreview from './ImagePreview'
import BottomBar from './BottomBar'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

export interface ImageRetouchProps {}

export default function ImageRetouch(props: ImageRetouchProps) {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    window.gtag?.('event', 'expose', {
      object: 'editor',
    })
  }, [])
  const handleClose = useAppStore((state) => state.cancel)
  const handleSave = useCallback(async () => {
    try {
      window.gtag?.('event', 'click', {
        object: 'save',
      })
      const { spec } = useCropStore.getState()
      const { image, background, adjustment } = useRetouchStore.getState()
      const idPhoto = await createIDPhoto({
        image,
        background,
        adjustment,
        resolution: spec.resolution,
      })
      const a = document.createElement('a')
      a.href = idPhoto
      a.download = 'idphoto.jpeg'
      a.click()
      window.gtag?.('event', 'click', {
        object: 'save_success',
      })
    } catch (error) {
      window.gtag?.('event', 'click', {
        object: 'save_fail',
      })
      enqueueSnackbar('Save failed.', {
        variant: 'error',
      })
    }
  }, [enqueueSnackbar])
  return (
    <ThemeProvider theme={theme}>
      <Box className="absolute inset-0">
        <TextureBackground className="bg-white" />
        <Box className="relative z-0 flex flex-col w-full h-full">
          <AppBar className="bg-transparent" position="fixed" elevation={0}>
            <Toolbar>
              <CloseButton
                className="mr-4"
                icon={<ArrowBackOutlinedIcon />}
                onClick={handleClose}
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Retouch (2/2)
              </Typography>
              <SaveButton onClick={handleSave} />
            </Toolbar>
          </AppBar>
          <ImagePreview />
          <BottomBar />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
