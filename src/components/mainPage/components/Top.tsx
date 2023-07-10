    import React from "react";
    import styled from "styled-components";
    import leicaTypo from "../../../../public/img/main/leicaTypo.jpg";
    import Image from "next/image";
    import globe from "../../../../public/img/main/globe.png";
    import monitor from "../../../../public/img/main/monitor.png";
    import copy from "../../../../public/img/main/copy.png";
    import clipboard from "../../../../public/img/main/clipboard.png";
    import microscope from "../../../../public/img/main/microscope.png";
    import topPicture from "../../../../public/img/main/topPicture.png";
    const Top = () => {
    return (
        <div>
        <LeicaTypo>
            <Image width={160} height={100} alt={""} src={leicaTypo} />
        </LeicaTypo>
        <MenuWrapper>
            <MenuBox>
            <MenuIcon>
                <Image width={23} height={23} alt={""} src={globe} />
            </MenuIcon>
            <MenuName2>About Leica Microsystems</MenuName2>
            </MenuBox>
            <MenuBox>
            <MenuIcon>
                <Image width={22} height={22} alt={""} src={clipboard} />
            </MenuIcon>
            <MenuName>소식 및 프로모션</MenuName>
            </MenuBox>
            <MenuBox>
            <MenuIcon>
                <Image width={22} height={20} alt={""} src={monitor} />
            </MenuIcon>
            <MenuName>기술자료</MenuName>
            </MenuBox>
            <MenuBox>
            <MenuIcon>
                <Image width={20} height={20} alt={""} src={copy} />
            </MenuIcon>
            <MenuName>견적 및 서비스 문의</MenuName>
            </MenuBox>
            <MenuBox>
            <MenuIcon>
                <Image width={20} height={20} alt={""} src={microscope} />
            </MenuIcon>
            <MenuName>공식 홈페이지</MenuName>
            </MenuBox>
        </MenuWrapper>
        <ContentWrapper>
            <Image width={917} height={500} alt={""} src={topPicture} />
        </ContentWrapper>

        <ScopeMenuWrapper>
            <ScopeMenuBox>광학 현미경</ScopeMenuBox>
            <ScopeMenuBox>공초점레이저 현미경</ScopeMenuBox>
            <ScopeMenuBox>디지털 현미경</ScopeMenuBox>
            <ScopeMenuBox>현미경 카메라</ScopeMenuBox>
            <ScopeMenuBox2>수술용 현미경</ScopeMenuBox2>
        </ScopeMenuWrapper>

        <ScopeMenuWrapper2>
            <ScopeMenuBox>수퍼해상도 현미경</ScopeMenuBox>
            <ScopeMenuBox>
            실체현미경
            <br />
            마크로 현미경
            </ScopeMenuBox>
            <ScopeMenuBox>현미경 소프트웨어</ScopeMenuBox>
            <ScopeMenuBox>
            전자현미경 <br />
            시료전처리
            </ScopeMenuBox>
            <ScopeMenuBox2>교육용 현미경</ScopeMenuBox2>
        </ScopeMenuWrapper2>
        </div>
    );
    };

    export default Top;

    const MenuBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 80px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #eeeeee;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: rgb(127, 145, 157);
    }
    `;

    const MenuIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-bottom: 5px;
    `;

    const MenuName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15x;
    font-weight: 550;
    white-space: nowrap;
    color: #686868;
    `;
    const MenuName2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10x;
    font-weight: 600;
    white-space: nowrap;
    letter-spacing: -1.4px;
    color: #686868;
    `;
    const LeicaTypo = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    `;

    const MenuWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 914px;
    margin: 0 auto;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: rgb(127, 145, 157);
    }
    `;

    const ContentWrapper = styled.div`
    width: 920px;
    height: 500px;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    right: 2px;
    `;

    const ScopeMenuWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 914px;
    margin: 0 auto;
    background-color: #eeeeee;
    border-bottom: 2px dotted #ced1d3;
    `;

    const ScopeMenuWrapper2 = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 914px;
    margin: 0 auto;
    background-color: #eeeeee;
    `;

    const ScopeMenuBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 181.8px;
    height: 80px;
    cursor: pointer;
    background-color: #eeeeee;
    transition: background-color 0.3s;
    color: #84949d;
    font-weight: 600;
    transition: background-color 0.3s;
    text-align: center;

    &:hover {
        background-color: #b3babd;
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -2px;
        height: 68%;
        width: 2px;
        background-color: #ced1d3;
        transform: translateY(-50%);
    }
    `;

    const ScopeMenuBox2 = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 182.8px;
    height: 80px;
    cursor: pointer;
    background-color: #eeeeee;
    transition: background-color 0.3s;
    color: #84949d;
    font-weight: 600;
    transition: background-color 0.3s;
    text-align: center;

    &:hover {
        background-color: #b3babd;
    }
    `;
