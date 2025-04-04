'use client';

import { Box, Typography, IconButton } from '@mui/material';
import PageContainer from '@/containers/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Head from 'next/head';

const IntroductionPage: React.FC = () => (
  <PageContainer title="Dashboard" description="this is Dashboard">
    <DashboardCard title="서비스 소개">
      <Box>
        <>
          <header className="header">
            <div className="header-content">
              <img src="/images/logos/logo.PNG" alt="Snowball Stock Logo" />
              <h2>주식 상장사 검색, 종목 스크리닝, 주가 알리미까지 모두 한 곳에서</h2>
              <h4>서비스 운영 비용상의 문제로, API서버를 운영하고 있지 않습니다</h4>
              <h4>프로젝트 세부 사항은 우측 상단의 github 링크를 참고 부탁드립니다</h4>
            </div>
            <IconButton 
              href="https://github.com/JMsuper/java-bondtypestock-investment-strategy" 
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
              sx={{
                border: '2px solid rgb(0, 0, 0)',
                borderRadius: '8px',
                padding: '8px',
                '&:hover': {
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              <img 
                src="/images/introduction/깃허브.PNG" 
                alt="GitHub Link"
                style={{ width: '100px', height: 'auto' }}
              />
            </IconButton>
          </header>
          <main className="container">
            {/* Section 1: 주식 상장사 검색 */}
            <section className="section">
              <h2>주식 상장사 검색</h2>
              <h3>간편하게 종목명과 코드를 검색하고 상세 정보를 확인하세요.</h3>
              <div className="image-container">
                <img src="/images/introduction/주식_상장사_검색.PNG" alt="주식 상장사 검색" />
                <img src="/images/introduction/주식_상장사_검색2.PNG" alt="주식 상장사 검색" />
              </div>
            </section>

            {/* Section 2: 종목 스크리닝 */}
            <section className="section">
              <h2>종목 스크리닝</h2>
              <h3>다양한 조건을 설정하여 나만의 투자 종목을 스크리닝하세요.</h3>
              <div className="image-container">
                <img src="/images/introduction/종목_스크리닝.PNG" alt="종목 스크리닝" />
                <img src="/images/introduction/종목_스크리닝2.PNG" alt="종목 스크리닝2" />
              </div>
            </section>

            {/* Section 3: 주가 알리미 */}
            <section className="section">
              <h2>주가 알리미</h2>
              <h3>목표 주가 도달 시 알림을 받고 투자 기회를 놓치지 마세요.</h3>
              <div className="image-container">
                <img src="/images/introduction/주가_알리미.PNG" alt="주가 알리미" />
              </div>
            </section>

            {/* Section 4: 신규 공시 구독 */}
            <section className="section">
              <h2>신규 공시 구독</h2>
              <h3>중요한 공시 정보를 실시간으로 구독하여 최신 정보를 확인하세요.</h3>
              <div className="image-container">
                <img src="/images/introduction/신규_공시_구독.PNG" alt="신규 공시 구독" />
              </div>
            </section>

            {/* Section 5: 관심 종목 관리 */}
            <section className="section">
              <h2>관심 종목 관리</h2>
              <h3>자주 조회하는 종목을 저장하고 관리하여 효율적으로 투자하세요.</h3>
              <div className="image-container">
                <img src="/images/introduction/관심종목.PNG" alt="관심 종목 관리" />
              </div>
            </section>

            {/* Section 6: 알림 기록 조회 */}
            <section className="section">
              <h2>알림 기록 조회</h2>
              <h3>과거 알림 기록을 조회하고 투자 성과를 점검해보세요.</h3>
              <div className="image-container">
                <img src="/images/introduction/알림_기록_조회.PNG" alt="알림 기록 조회" />
              </div>
            </section>
          </main>
          <footer className="footer">
            <p>© 2024 Snowball Stock.</p>
          </footer>
          <style jsx>{`
            .header {
              color: blue;
              text-align: center;
              padding: 20px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              position: sticky;
              top: 0;
              z-index: 1000;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }

            .header-content {
              flex: 1;
              text-align: center;
            }

            .github-button {
              position: absolute;
              top: 20px;
              right: 20px;
            }

            .header img {
              margin: 0;
              height: 100px
            }

            .header h2 {
              margin-top: 10px;
              color: #1976d2;
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
            }

            .section {
                  margin-top: 80px;
                  margin-bottom: 80px;
              animation: fadeInUp 1s ease-in-out;
            }

            .section h2 {
              color: #1976d2;
              font-size: 1.8rem;
              margin-bottom: 20px;
            }

            .section p {
              font-size: 1rem;
              margin-bottom: 20px;
            }

            .image-container {
              display: flex;
              flex-wrap: wrap;
              gap: 50px;
            }

            .image-container img {
              width: 80%;
              height: auto;
              max-width: 100%;
              border: 2px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease;
            }

            .image-container img:hover {
              transform: scale(1.05);
            }

            .footer {
              background-color: #1976d2;
              color: white;
              text-align: center;
              padding: 10px 0;
              margin-top: 20px;
              box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
            }

            .footer p {
              margin: 0;
              font-size: 0.9rem;
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      </Box>
    </DashboardCard>
  </PageContainer>
);

export default IntroductionPage;