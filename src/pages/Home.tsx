import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDriversLicense, faSchoolFlag } from '@fortawesome/free-solid-svg-icons'

import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { Banner } from '../components/Banner'

import { Stacks } from '../components/home/Stacks'
import { CardContainer } from '../components/home/CardContainer'
import { Projects } from '../components/home/Projects'
import { Articles } from '../components/home/Articles'
import { Title } from '../components/home/Title'
import { WorkExperience } from '../components/home/WorkExperience'
import { Awards } from '../components/home/Awards'
import { Presentations } from '../components/home/Presentations'

import { histories } from '../data/histories'
import { certifications } from '../data/certifications'

export const Home = () => (
    <>
        <div className='page-content'>
            <NavBar active='home' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <Banner key='smch' color='bg-blue-400' link='/pledge'>
                        <span className='text-sm sm:text-base font-medium'>
                            2026 세명컴퓨터고등학교 스마트보안솔루션과 과대표
                        </span>
                        <span className='text-sm sm:text-base underline font-semibold'>후보자 공약 보기</span>
                    </Banner>
                    <Banner key='blog' color='bg-teal-600' link='https://articles.swua.kr'>
                        <span className='text-sm sm:text-base font-medium'>
                            광고 없는 블로그 미러링/아카이브 사이트를 새롭게 오픈하였습니다.
                        </span>
                    </Banner>
                    <div className='flex flex-col lg:flex-row justify-between items-center mt-6'>
                        <div className='flex flex-col items-start pl-3 sm:pl-10 lg:pl-0 mr-0 lg:mr-6 w-full mb-10 lg:mb-0'>
                            <h1 className='text-4xl font-bold max-w-[85%] mt-4'>Kim Jun Young</h1>
                            <h2 className='text-2xl font-semibold mt-4 text-gray-600'>안녕하세요, 저는</h2>
                            <div className='mt-4 text-lg text-gray-400'>
                                <Title />
                            </div>
                        </div>

                        <div className='mt-6 lg:mt-0'>
                            <div className='w-[250px] h-[250px] overflow-hidden rounded-[10%] shadow-lg cursor-pointer'>
                                <img
                                    src='https://avatars.githubusercontent.com/u/59119316'
                                    alt='about'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-center'>
                        <div className='flex items-center gap-5 pt-5 text-3xl text-gray-500'>
                            <a href='https://github.com/yulmwu' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faGithub} className='hover:text-primary transition-colors' />
                            </a>
                            <a href='https://linkedin.com/in/yulmwu' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faLinkedin} className='hover:text-primary transition-colors' />
                            </a>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-8 pt-30'>
                        <div className='flex-1'>
                            <WorkExperience />
                        </div>
                        <div className='flex-1'>
                            <CardContainer title='Histories' icon={faSchoolFlag} contents={histories} />
                            <CardContainer title='Certifications' icon={faDriversLicense} contents={certifications} />
                        </div>
                    </div>

                    <div className='pt-20'>
                        <Stacks />
                    </div>

                    <div className='pt-10'>
                        <Awards />
                    </div>

                    <div className='pt-20'>
                        <Articles responsive maxArticles={6} />
                    </div>

                    <div className='pt-20'>
                        <Projects maxProjects={6} />
                    </div>

                    <div className='pt-20'>
                        <Presentations maxPresentations={4} />
                    </div>

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    </>
)
