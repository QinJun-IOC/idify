import classNames from 'classnames'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import { useAppStore, useSegementStore } from '@/stores'
import { useCallback } from 'react'
import { useSnackbar } from 'notistack'

const DEMOS = [

]

export function ImageAdd() {
    const { enqueueSnackbar } = useSnackbar()
    const crop = useAppStore((state) => state.crop)
    const { process: segment } = useSegementStore()
    const handleAdd = useCallback(
        (file: string) => {
            segment(file)
                .then((result) => {
                    // ignore
                })
                .catch(() => {
                    enqueueSnackbar('Oops, remove image background failed', {
                        variant: 'error',
                    })
                })
            crop(file)
        },
        [crop, segment, enqueueSnackbar]
    )

    return (
        <Box className="relative">
            <AddPhotoAlternateIcon className="block text-8xl text-white" />
            <input
                className="absolute z-1 inset-0 opacity-0 cursor-pointer"
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                onChange={(event) => {
                    const file = event.target?.files?.[0]
                    if (file) {
                        handleAdd(URL.createObjectURL(file))
                    }
                }}
            />
            <AvatarGroup
                className={classNames(
                    'absolute -bottom-[10px] left-1/2 -translate-x-1/2 translate-y-full'
                )}
            >
                {DEMOS.map((item, index) => {
                    return (
                        <Avatar
                            key={index}
                            className="cursor-pointer"
                            sx={{ width: 28, height: 28 }}
                            src={item}
                            onClick={() => {
                                handleAdd(item)
                            }}
                        />
                    )
                })}
            </AvatarGroup>
        </Box>
    )
}

export default ImageAdd
