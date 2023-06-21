import { type ReactNode, useState } from 'react'
import SettingDetail from '../../setting/SettingDetail'
import BasicSettingLine from '../../setting/BasicSettingLine'
import TipInfo from '../../TipInfo'
import useUserConfig from '../../../hooks/useUserConfig'
import { get } from 'lodash'
import CloudStatus from './CloudStatus'
import classNames from 'classnames'
import useUserInfo from '../../../hooks/useUserInfo'
import useOssKey from '../../../hooks/useOssKey'

interface Props {
  children?: ReactNode
}

export default function ImageCloud(props: Props) {
  const [cloudConfig, setCloudConfig] = useUserConfig('cloud')
  const [user] = useUserInfo()
  const [oss] = useOssKey()
  const enabled = !!get(cloudConfig, 'enable')
  return (
    <SettingDetail
      label={
        <div className={'flex items-center'}>
          <span>图床（试运行）</span>
        </div>
      }
    >
      <div className={'px-1 pb-2'}>
        <div>
          <div className={' rounded-lg overflow-hidden bg-color-50'}>
            <BasicSettingLine
              label={'启用图片优化（图床）'}
              right={
                <input
                  type="checkbox"
                  className="toggle toggle-primary "
                  checked={enabled}
                  onChange={(e) => {
                    setCloudConfig({
                      enable: e.target.checked,
                    })
                  }}
                />
              }
            />
          </div>
          <div className={'mt-1 mx-5 text-xs text-color-400 mb-6'}>
            {enabled
              ? '将快照图片上传至云端，生成图片链接。任何获得该链接的用户，都可以在互联网访问该资源。'
              : '优化本机图片存储'}
          </div>

          {enabled && (
            <div>
              <div className={'mt-2 mx-5 text-xs text-color-400 mb-1'}>
                图床服务
              </div>
              <div className={' rounded-lg overflow-hidden bg-color-50'}>
                {/*<BasicSettingLine*/}
                {/*  label={*/}
                {/*    <span>*/}
                {/*      <span>私人云</span>*/}
                {/*      <TipInfo*/}
                {/*        tip={*/}
                {/*          '由你指定数据云存储空间，最大程度的保证你的数据安全。'*/}
                {/*        }*/}
                {/*      />*/}
                {/*    </span>*/}
                {/*  }*/}
                {/*  right={*/}
                {/*    <div>*/}
                {/*      <CloudStatus cloudServer={'customAliOss'} />*/}
                {/*    </div>*/}
                {/*  }*/}
                {/*/>*/}
                <BasicSettingLine
                  label={
                    <span>
                      PAGENOTE 云
                      <TipInfo
                        tip={
                          'VIP 可用。由PAGENOTE官方提供的基础服务。PAGENOTE 保证该服务的稳定。'
                        }
                      />
                    </span>
                  }
                  right={
                    <div>
                      <a
                        href={'https://pagenote.cn/pro-plan'}
                        target={'_blank'}
                        className={classNames(
                          'btn btn-outline btn-xs text-sm btn-info font-normal',
                          {
                            'btn-success': !!oss?.cloud_space,
                            'btn-error': !oss?.cloud_space,
                          }
                        )}
                      >
                        {oss?.cloud_space ? '已连接' : 'VIP 可用'}
                      </a>
                    </div>
                  }
                />
              </div>
              <div className={'p-5 flex flex-row-reverse'}>
                <a
                  href="https://developer.pagenote.cn/privacy#51a07bcd45dc4e03be0b8301bf5a7bed"
                  target={'_blank'}
                  className={'text-xs link-primary link'}
                >
                  隐私保护须知
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </SettingDetail>
  )
}

ImageCloud.defaultProps = {}
