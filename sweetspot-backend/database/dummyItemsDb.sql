PGDMP         ,            
    x         	   sweetspot    12.4    12.4 3    O           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            P           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Q           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            R           1262    19139 	   sweetspot    DATABASE     �   CREATE DATABASE sweetspot WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Hungarian_Hungary.1250' LC_CTYPE = 'Hungarian_Hungary.1250';
    DROP DATABASE sweetspot;
                postgres    false            S           0    0    DATABASE sweetspot    COMMENT     i   COMMENT ON DATABASE sweetspot IS 'SweetSpot full-stack application database for development purposes. ';
                   postgres    false    2898            �           1247    19180    order_delivery_enum    TYPE     R   CREATE TYPE public.order_delivery_enum AS ENUM (
    'SHIPPING',
    'PICK_UP'
);
 &   DROP TYPE public.order_delivery_enum;
       public          postgres    false            �           1247    19186    order_language_enum    TYPE     Q   CREATE TYPE public.order_language_enum AS ENUM (
    'HU',
    'SR',
    'EN'
);
 &   DROP TYPE public.order_language_enum;
       public          postgres    false            �            1259    19155 
   ingredient    TABLE     a   CREATE TABLE public.ingredient (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.ingredient;
       public         heap    postgres    false            �            1259    19153    ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.ingredient_id_seq;
       public          postgres    false    205            T           0    0    ingredient_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.ingredient_id_seq OWNED BY public.ingredient.id;
          public          postgres    false    204            �            1259    19208    ingredient_items_item    TABLE     r   CREATE TABLE public.ingredient_items_item (
    "ingredientId" integer NOT NULL,
    "itemId" integer NOT NULL
);
 )   DROP TABLE public.ingredient_items_item;
       public         heap    postgres    false            �            1259    19168    item    TABLE       CREATE TABLE public.item (
    id integer NOT NULL,
    "titleHun" text NOT NULL,
    "titleSer" text NOT NULL,
    "titleEng" text NOT NULL,
    "descriptionHun" text NOT NULL,
    "descriptionSer" text NOT NULL,
    "descriptionEng" text NOT NULL,
    picture text NOT NULL,
    price integer NOT NULL,
    glutenfree boolean NOT NULL,
    sugarfree boolean NOT NULL,
    lactosefree boolean NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    19166    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          postgres    false    207            U           0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          postgres    false    206            �            1259    19195    order    TABLE     4  CREATE TABLE public."order" (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text NOT NULL,
    "grandTotal" integer NOT NULL,
    "deliveryDate" text NOT NULL,
    delivery public.order_delivery_enum DEFAULT 'SHIPPING'::public.order_delivery_enum NOT NULL,
    notes text,
    language public.order_language_enum DEFAULT 'HU'::public.order_language_enum NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false    645    648    648    645            �            1259    19193    order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.order_id_seq;
       public          postgres    false    209            V           0    0    order_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;
          public          postgres    false    208            �            1259    19215    order_items_item    TABLE     h   CREATE TABLE public.order_items_item (
    "orderId" integer NOT NULL,
    "itemId" integer NOT NULL
);
 $   DROP TABLE public.order_items_item;
       public         heap    postgres    false            �            1259    19142    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    19140    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    203            W           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    202            �
           2604    19158    ingredient id    DEFAULT     n   ALTER TABLE ONLY public.ingredient ALTER COLUMN id SET DEFAULT nextval('public.ingredient_id_seq'::regclass);
 <   ALTER TABLE public.ingredient ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    19171    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    19198    order id    DEFAULT     f   ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
 9   ALTER TABLE public."order" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    19145    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            F          0    19155 
   ingredient 
   TABLE DATA           .   COPY public.ingredient (id, name) FROM stdin;
    public          postgres    false    205   ]>       K          0    19208    ingredient_items_item 
   TABLE DATA           I   COPY public.ingredient_items_item ("ingredientId", "itemId") FROM stdin;
    public          postgres    false    210   z>       H          0    19168    item 
   TABLE DATA           �   COPY public.item (id, "titleHun", "titleSer", "titleEng", "descriptionHun", "descriptionSer", "descriptionEng", picture, price, glutenfree, sugarfree, lactosefree, "createdDate", "updateDate") FROM stdin;
    public          postgres    false    207   �>       J          0    19195    order 
   TABLE DATA           �   COPY public."order" (id, name, phone, email, address, "grandTotal", "deliveryDate", delivery, notes, language, "createdDate", "updateDate") FROM stdin;
    public          postgres    false    209   A       L          0    19215    order_items_item 
   TABLE DATA           ?   COPY public.order_items_item ("orderId", "itemId") FROM stdin;
    public          postgres    false    211   6A       D          0    19142    user 
   TABLE DATA           >   COPY public."user" (id, username, password, salt) FROM stdin;
    public          postgres    false    203   SA       X           0    0    ingredient_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.ingredient_id_seq', 1, false);
          public          postgres    false    204            Y           0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 10, true);
          public          postgres    false    206            Z           0    0    order_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.order_id_seq', 1, false);
          public          postgres    false    208            [           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    202            �
           2606    19207 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public            postgres    false    209            �
           2606    19212 4   ingredient_items_item PK_3bc85f596d2084161e9515550d6 
   CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "PK_3bc85f596d2084161e9515550d6" PRIMARY KEY ("ingredientId", "itemId");
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "PK_3bc85f596d2084161e9515550d6";
       public            postgres    false    210    210            �
           2606    19163 )   ingredient PK_6f1e945604a0b59f56a57570e98 
   CONSTRAINT     i   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "PK_6f1e945604a0b59f56a57570e98";
       public            postgres    false    205            �
           2606    19219 /   order_items_item PK_bcabdedbdb5a0a82b7ea791e407 
   CONSTRAINT     �   ALTER TABLE ONLY public.order_items_item
    ADD CONSTRAINT "PK_bcabdedbdb5a0a82b7ea791e407" PRIMARY KEY ("orderId", "itemId");
 [   ALTER TABLE ONLY public.order_items_item DROP CONSTRAINT "PK_bcabdedbdb5a0a82b7ea791e407";
       public            postgres    false    211    211            �
           2606    19150 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    203            �
           2606    19178 #   item PK_d3c0c71f23e7adcf952a1d13423 
   CONSTRAINT     c   ALTER TABLE ONLY public.item
    ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.item DROP CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423";
       public            postgres    false    207            �
           2606    19152 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public            postgres    false    203            �
           2606    19165 )   ingredient UQ_b6802ac7fbd37aa71d856a95d8f 
   CONSTRAINT     f   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE (name);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f";
       public            postgres    false    205            �
           1259    19213    IDX_5d0b70b8509eaa5ec6848688db    INDEX     l   CREATE INDEX "IDX_5d0b70b8509eaa5ec6848688db" ON public.ingredient_items_item USING btree ("ingredientId");
 4   DROP INDEX public."IDX_5d0b70b8509eaa5ec6848688db";
       public            postgres    false    210            �
           1259    19214    IDX_859d0d7265acb9c143bc70fb09    INDEX     f   CREATE INDEX "IDX_859d0d7265acb9c143bc70fb09" ON public.ingredient_items_item USING btree ("itemId");
 4   DROP INDEX public."IDX_859d0d7265acb9c143bc70fb09";
       public            postgres    false    210            �
           1259    19220    IDX_98444c0ad52b9e6e2b1f8f1a7d    INDEX     b   CREATE INDEX "IDX_98444c0ad52b9e6e2b1f8f1a7d" ON public.order_items_item USING btree ("orderId");
 4   DROP INDEX public."IDX_98444c0ad52b9e6e2b1f8f1a7d";
       public            postgres    false    211            �
           1259    19221    IDX_beae103ca77096a308d911bc0b    INDEX     a   CREATE INDEX "IDX_beae103ca77096a308d911bc0b" ON public.order_items_item USING btree ("itemId");
 4   DROP INDEX public."IDX_beae103ca77096a308d911bc0b";
       public            postgres    false    211            �
           2606    19222 4   ingredient_items_item FK_5d0b70b8509eaa5ec6848688dbc    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc" FOREIGN KEY ("ingredientId") REFERENCES public.ingredient(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc";
       public          postgres    false    210    205    2738            �
           2606    19227 4   ingredient_items_item FK_859d0d7265acb9c143bc70fb094    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "FK_859d0d7265acb9c143bc70fb094" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "FK_859d0d7265acb9c143bc70fb094";
       public          postgres    false    210    2742    207            �
           2606    19232 /   order_items_item FK_98444c0ad52b9e6e2b1f8f1a7df    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items_item
    ADD CONSTRAINT "FK_98444c0ad52b9e6e2b1f8f1a7df" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.order_items_item DROP CONSTRAINT "FK_98444c0ad52b9e6e2b1f8f1a7df";
       public          postgres    false    211    2744    209            �
           2606    19237 /   order_items_item FK_beae103ca77096a308d911bc0b8    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items_item
    ADD CONSTRAINT "FK_beae103ca77096a308d911bc0b8" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.order_items_item DROP CONSTRAINT "FK_beae103ca77096a308d911bc0b8";
       public          postgres    false    211    207    2742            F      x������ � �      K      x������ � �      H   r  x��On�0��p�o?jLwi��r���u���m%w�E��eו���{��R�� ??�@?�nۿ�����}v�X�>:��c-��^�k��J*�$T�W�=XY˯P��r.%8t(�����3U��ЋZ
w�Z�����oѤ���������֔�.�Ci��$1��Jn���� Z��cZ�PPr�؞�m�ʿ�5z�e�<�S���a�r{vV�^��	ڳo�JaUX��I�}�F�����oj�����|�Xm`'��;	{++	ޚ˹ �~���`{�)Z�;�	}��X�s_`P׬���ښ
��s�
_=�a��9��V��C�FSA4��4�@�����u~s�̝P[�|�q�RzW���hWoJ	|�ƓF�.bt�'$�<"	�I�����0�a�4,��������<N�,M�#��U�d�eҰ�,���$��,&d5
˵��IÒ���8�������ӈ%<#�(,�j�ΰL>�,ˏ�,,�&i�X�F`y����IÒ��$��w��)���I6
˵�fX&�r��NC#��4��l�-Ga�V�l�eҰ�zX� ��n�uKX��c���r���̴L��lX�ЏV�,�Y��8f�\���(��?9b�      J      x������ � �      L      x������ � �      D   �   x�3��I,���/H,���K�T1JT14P)��Ouw/��61sI.41���(͈��
��1qI�0�,p5)�226��4u�O�0Ư��jUR"Ц��SoG��ߜ\���D�P����������� � g����B��ȒҲ � �lgw���b���� �B�     