import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NtsLogo from '../../public/img/main/ntsrow.png';
import LeicaLogo from '../../public/img/main/leicalogo.png';
import Image from 'next/image';
import leicaMainImg from '../../public/img/main/leicaMainImg.webp';
import Router from 'next/router';
import { pathName } from '@/config/pathName';
import { getParentCategory } from '../../pages/api/category';

interface Category {
  parentId: number;
  parentName: string;
}

const Top: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    setCurrentCategory(categoryId);
    Router.push({
      pathname: pathName.MICROSCOPE,
      query: { categoryId: categoryId, categoryName: categoryName },
    });
  };
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/category/parent`
  //     );
  //     const filledCategories = [
  //       ...response.data,
  //       ...Array.from(
  //         { length: Math.max(8 - response.data.length, 0) },
  //         () => ({ id: -1, name: "" })
  //       ),
  //     ];
  //     setCategories(filledCategories);
  //   } catch (error) {
  //     console.error("API 요청 실패:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getParentCategory();
      const filledCategories = [
        ...response.data,
        ...Array.from(
          { length: Math.max(8 - response.data.length, 0) },
          () => ({
            id: -1,
            name: '',
          })
        ),
      ];
      setCategories(filledCategories);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <LeicaTypoBox>
        <LeicaTypo
          onClick={() => {
            Router.push(pathName.MAIN);
          }}
        >
          <Image width={300} height={50} alt={''} src={NtsLogo} />
        </LeicaTypo>
      </LeicaTypoBox>
      <ContentWrapper>
        <Image width={917} height={500} alt={''} src={leicaMainImg} />
        <AbsoluteImg width={160} height={80} alt={''} src={LeicaLogo} />
      </ContentWrapper>
      <ScopeMenuWrapper>
        {categories.map((category, index) => (
          <ScopeMenuBox
            key={index}
            onClick={() =>
              category.parentName == undefined
                ? null
                : handleCategoryClick(category.parentId, category.parentName)
            }
            $showafter={index === 3 || index === 7 ? false : true}
            $isEmpty={categories[index]?.parentName === undefined}
          >
            {category.parentName}
          </ScopeMenuBox>
        ))}
      </ScopeMenuWrapper>
    </>
  );
};

export default Top;

const AbsoluteImg = styled(Image)`
  position: absolute;
  right: 5px;
  top: 5px;
`;
const LeicaTypoBox = styled.div`
  display: flex;
  width: 917px;
  margin: 15px auto;
`;
const LeicaTypo = styled.div`
  width: 160px;
  &:hover {
    cursor: pointer;
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
  border-radius: 15px;
  overflow: hidden;
`;

const ScopeMenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 914px;
  margin: 0 auto;
  background-color: #eeeeee;
  position: relative;
  margin-bottom: 57px;
  z-index: 0;
  &::after {
    content: '';
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ced1d3;
  }
`;
const ScopeMenuBox = styled.div<{ $showafter: boolean; $isEmpty?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 228px;
  height: 80px;
  background-color: #eeeeee;
  color: #84949d;
  font-weight: 600;
  transition: background-color 0.3s;
  text-align: center;
  font-size: 19px;
  z-index: 0;

  &:hover {
    background-color: ${(props) => (props.$isEmpty ? 'inherit' : '#b3babd')};
    cursor: ${(props) => (props.$isEmpty ? '' : 'pointer')};
  }

  ${(props) =>
    props.$showafter &&
    `
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0px;
        height: 68%;
        width: 2px;
        background-color:  #b3babd;
        transform: translateY(-50%);
      }
    `}
`;
const EmptyScopeMenuBox = styled.div<{ $showafter: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 228px;
  height: 80px;
  background-color: #eeeeee;
  color: #84949d;
  font-weight: 600;
  text-align: center;
  font-size: 19px;
  z-index: 0;

  ${(props) =>
    props.$showafter &&
    `
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0px;
        height: 68%;
        width: 2px;
        background-color:  #b3babd;
        transform: translateY(-50%);
      }
    `}
`;
const EstimateBox = styled.div<{ $hovered: boolean }>`
  width: 170px;
  height: ${(props) => (props.$hovered ? '140px' : '100px')};
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  background-color: white;
  transition: height 0.3s;
  &:hover {
    height: 140px;
    cursor: pointer;
  }
`;
const EstimateImage = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px 10px 0px;
`;

const EstimateSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10x;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: -1.4px;
  color: #686868;
  margin-top: 10px;
  margin-bottom: 14px;
`;

const EstimateMessage = styled.div`
  font-size: 14px;
  color: #686868;
  display: flex;
  justify-content: center;
`;

const FixedRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 80px;
  right: 2%;
`;
