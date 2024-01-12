import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import CategoryModifyModal from "./CategoryModifyModal";
import { AdminContext } from "@/components/AdminProvider";
import { getSubCategory } from "../../../../pages/api/subCategory";

interface ListWrapperProps {
  $expanded: boolean;
}
interface CategoryTitleProp {
  $isActive: boolean;
}

interface CategoryItem {
  id: number;
  childName: string;
  size: number;
}

interface PageButtonProps {
  $isactive: boolean;
}

const SubCategoryList: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const [showList, setShowList] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [subCategory, setSubCategory] = useState<number | null>();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const toggleModal = (index: number) => {
    setActiveModalIndex(index === activeModalIndex ? null : index);
  };

  const router = useRouter();
  const { categoryName, categoryId } = router.query;

  const handleCategoryClick = (
    subCategoryName: string,
    subCategoryId: number,
    categoryId: any,
    categoryName: any
  ) => {
    setSubCategory(subCategory);
    router.push({
      query: {
        subCategoryId: subCategoryId,
        subCategoryName: subCategoryName,
        categoryId: categoryId,
        categoryName: categoryName,
      },
    });
  };

  useEffect(() => {
    if (categoryId) {
      const fetchCategories = async () => {
        const data = await getSubCategory(categoryId);
        setCategories(data);
      };
      fetchCategories();
    }
  }, [categoryId, router.query.category, subCategory]);

  useEffect(() => {
    if (categoryId) {
      const newTotalPages = Math.max(
        Math.ceil(categories.length / itemsPerPage),
        1
      );
      setTotalPages(newTotalPages);
      setCurrentPage(1);
    }
  }, [categoryId, categories, subCategory]);

  const getPaginatedData = (data: any) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const currentItems = getPaginatedData(categories || []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages, categoryId]);

  return (
    <ListWrapper $expanded={showList}>
      <ListTitleBox>
        <ListTitle>{categoryName}</ListTitle>

        <ListAmount>{categories.length}개의 카테고리</ListAmount>

        <ListToggleBtn onClick={toggleList}>
          {showList ? "목록닫기" : "목록열기"}
        </ListToggleBtn>
      </ListTitleBox>
      {showList && (
        <ListContents>
          <ContentsTitleBox>
            <ContentsTitleSpan>카테고리 제목</ContentsTitleSpan>
            <ContentsAmountSpan>글 갯수</ContentsAmountSpan>
          </ContentsTitleBox>

          {currentItems.map((category: any, index: any) => (
            <ContentBox key={category.id}>
              <CategoryTitle
                onClick={() =>
                  handleCategoryClick(
                    category.childName,
                    category.id,
                    categoryId,
                    categoryName
                  )
                }
                $isActive={category.childName === subCategory}
              >
                {category.childName}
              </CategoryTitle>
              <CategoryAmount>{category.size}개의 글</CategoryAmount>
              {isAdmin && (
                <ToogleBtnSet>
                  <DetailBtn>
                    <svg
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      onClick={() => toggleModal(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path>
                      <circle cx="12" cy="12" r="3.5"></circle>
                    </svg>
                  </DetailBtn>
                  {activeModalIndex === index && (
                    <BtnModal>
                      <CategoryModifyModal categoryId={category.id} />
                    </BtnModal>
                  )}
                </ToogleBtnSet>
              )}
            </ContentBox>
          ))}
          {currentItems.length > 0 && (
            <Page>
              {Array.from({ length: totalPages }, (_, index) => (
                <PageButton
                  key={index + 1}
                  $isactive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
            </Page>
          )}
        </ListContents>
      )}
    </ListWrapper>
  );
};

export default SubCategoryList;
const ListWrapper = styled.div<ListWrapperProps>`
  width: 966px;
  margin: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 8px;
`;

const ListTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px 5px 0px;
`;

const ListTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  align-items: center;
  margin-right: 5px;
`;

const ListAmount = styled.div`
  font-size: 13px;
  align-items: center;
`;

const ListToggleBtn = styled.div`
  font-size: 13px;
  height: 17.6px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ListContents = styled.div``;

const ContentsTitleBox = styled.div`
  width: 936px;
  height: 32px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  border-bottom: 1px solid;
  border-color: rgb(146, 146, 146);
`;
const ContentsTitleSpan = styled.div`
  height: 20px;
  margin: 6px 0px 6px 0px;
  font-size: 12px;
  align-items: center;
  color: rgb(146, 146, 146);
`;
const ContentsAmountSpan = styled.div`
  margin-left: 800px;
  font-size: 12px;
  padding: 6px 0px 6px 0px;
  color: rgb(146, 146, 146);
`;

const ContentBox = styled.div`
  width: 936px;
  height: 36px;
  border-bottom: 1px solid;
  border-color: rgb(223, 223, 223);
  align-items: center;
  display: flex;
`;

const CategoryTitle = styled.div<CategoryTitleProp>`
  width: 800px;
  font-size: 12px;
  font: 나눔고딕;
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
`;

const CategoryAmount = styled.div`
  font-size: 12px;
  color: rgb(146, 146, 146);
  width: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DetailBtn = styled.div`
  color: rgb(146, 146, 146);
  margin-left: 15px;
  width: 20px;
  height: 20px;
`;
const ToogleBtnSet = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const BtnModal = styled.div`
  position: absolute;
  z-index: 1;
  top: 14px;
  left: 35px;
`;

const Page = styled.div`
  width: 926px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<PageButtonProps>`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  background-color: white;
  color: ${(props) => (props.$isactive ? "#ff0000" : "black")};
  border: 2px solid ${(props) => (props.$isactive ? "#d3d3d3" : "white")};
  font-weight: ${(props) => (props.$isactive ? "600" : "400")};
  cursor: pointer;
  outline: none;
  &:hover {
    border: 2px solid #d3d3d3;
  }
`;
const PageBox = styled.div`
  width: 966px;
  height: 60px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageBoxContainer = styled.div`
  margin-top: 8px;
`;
