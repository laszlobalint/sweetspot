PGDMP         2            	    x        	   sweetspot    12.4    12.4 +    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            B           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            C           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            D           1262    18807 	   sweetspot    DATABASE     �   CREATE DATABASE sweetspot WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Hungarian_Hungary.1250' LC_CTYPE = 'Hungarian_Hungary.1250';
    DROP DATABASE sweetspot;
                postgres    false                        1247    18809    order_delivery_enum    TYPE     R   CREATE TYPE public.order_delivery_enum AS ENUM (
    'SHIPPING',
    'PICK_UP'
);
 &   DROP TYPE public.order_delivery_enum;
       public          postgres    false            �            1259    18813 
   ingredient    TABLE     a   CREATE TABLE public.ingredient (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.ingredient;
       public         heap    postgres    false            �            1259    18819    ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.ingredient_id_seq;
       public          postgres    false    202            E           0    0    ingredient_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.ingredient_id_seq OWNED BY public.ingredient.id;
          public          postgres    false    203            �            1259    18821    ingredient_items_item    TABLE     r   CREATE TABLE public.ingredient_items_item (
    "ingredientId" integer NOT NULL,
    "itemId" integer NOT NULL
);
 )   DROP TABLE public.ingredient_items_item;
       public         heap    postgres    false            �            1259    18824    item    TABLE     �  CREATE TABLE public.item (
    id integer NOT NULL,
    glutenfree boolean NOT NULL,
    sugarfree boolean NOT NULL,
    lactosefree boolean NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL,
    "ordersId" integer,
    description text NOT NULL,
    price integer NOT NULL,
    title text NOT NULL,
    picture text NOT NULL
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    18832    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          postgres    false    205            F           0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          postgres    false    206            �            1259    18834    order    TABLE     �  CREATE TABLE public."order" (
    id integer NOT NULL,
    delivery public.order_delivery_enum DEFAULT 'SHIPPING'::public.order_delivery_enum NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL,
    "grandTotal" integer NOT NULL,
    "deliveryDate" text NOT NULL,
    notes text,
    name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false    544    544            �            1259    18843    order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.order_id_seq;
       public          postgres    false    207            G           0    0    order_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;
          public          postgres    false    208            �            1259    18845    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    18851    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    209            H           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    210            �
           2604    18853    ingredient id    DEFAULT     n   ALTER TABLE ONLY public.ingredient ALTER COLUMN id SET DEFAULT nextval('public.ingredient_id_seq'::regclass);
 <   ALTER TABLE public.ingredient ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    18854    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205            �
           2604    18855    order id    DEFAULT     f   ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
 9   ALTER TABLE public."order" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207            �
           2604    18856    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            6          0    18813 
   ingredient 
   TABLE DATA           .   COPY public.ingredient (id, name) FROM stdin;
    public          postgres    false    202   53       8          0    18821    ingredient_items_item 
   TABLE DATA           I   COPY public.ingredient_items_item ("ingredientId", "itemId") FROM stdin;
    public          postgres    false    204   �9       9          0    18824    item 
   TABLE DATA           �   COPY public.item (id, glutenfree, sugarfree, lactosefree, "createdDate", "updateDate", "ordersId", description, price, title, picture) FROM stdin;
    public          postgres    false    205   �9       ;          0    18834    order 
   TABLE DATA           �   COPY public."order" (id, delivery, "createdDate", "updateDate", "grandTotal", "deliveryDate", notes, name, phone, email, address) FROM stdin;
    public          postgres    false    207   �;       =          0    18845    user 
   TABLE DATA           >   COPY public."user" (id, username, password, salt) FROM stdin;
    public          postgres    false    209   �;       I           0    0    ingredient_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingredient_id_seq', 181, true);
          public          postgres    false    203            J           0    0    item_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.item_id_seq', 8, true);
          public          postgres    false    206            K           0    0    order_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.order_id_seq', 1, false);
          public          postgres    false    208            L           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    210            �
           2606    18858 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public            postgres    false    207            �
           2606    18860 4   ingredient_items_item PK_3bc85f596d2084161e9515550d6 
   CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "PK_3bc85f596d2084161e9515550d6" PRIMARY KEY ("ingredientId", "itemId");
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "PK_3bc85f596d2084161e9515550d6";
       public            postgres    false    204    204            �
           2606    18862 )   ingredient PK_6f1e945604a0b59f56a57570e98 
   CONSTRAINT     i   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "PK_6f1e945604a0b59f56a57570e98";
       public            postgres    false    202            �
           2606    18864 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    209            �
           2606    18866 #   item PK_d3c0c71f23e7adcf952a1d13423 
   CONSTRAINT     c   ALTER TABLE ONLY public.item
    ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.item DROP CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423";
       public            postgres    false    205            �
           2606    18868 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public            postgres    false    209            �
           2606    18870 )   ingredient UQ_b6802ac7fbd37aa71d856a95d8f 
   CONSTRAINT     f   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE (name);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f";
       public            postgres    false    202            �
           1259    18871    IDX_5d0b70b8509eaa5ec6848688db    INDEX     l   CREATE INDEX "IDX_5d0b70b8509eaa5ec6848688db" ON public.ingredient_items_item USING btree ("ingredientId");
 4   DROP INDEX public."IDX_5d0b70b8509eaa5ec6848688db";
       public            postgres    false    204            �
           1259    18872    IDX_859d0d7265acb9c143bc70fb09    INDEX     f   CREATE INDEX "IDX_859d0d7265acb9c143bc70fb09" ON public.ingredient_items_item USING btree ("itemId");
 4   DROP INDEX public."IDX_859d0d7265acb9c143bc70fb09";
       public            postgres    false    204            �
           2606    18873 4   ingredient_items_item FK_5d0b70b8509eaa5ec6848688dbc    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc" FOREIGN KEY ("ingredientId") REFERENCES public.ingredient(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc";
       public          postgres    false    204    202    2726            �
           2606    18878 #   item FK_7cfe3863a83e4c00da26e9f330b    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT "FK_7cfe3863a83e4c00da26e9f330b" FOREIGN KEY ("ordersId") REFERENCES public."order"(id);
 O   ALTER TABLE ONLY public.item DROP CONSTRAINT "FK_7cfe3863a83e4c00da26e9f330b";
       public          postgres    false    2736    205    207            �
           2606    18883 4   ingredient_items_item FK_859d0d7265acb9c143bc70fb094    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "FK_859d0d7265acb9c143bc70fb094" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "FK_859d0d7265acb9c143bc70fb094";
       public          postgres    false    204    205    2734            6   �  x�]VK�����(����f$@�/Y@&�M˴�H�y�.z�Ѓ4
�A�� !j=�B)�]���KR��s�ɿ�������[A�C+�Ǟiռ~24%�NB��q�f�4[u;)}4_�3�ݳ]?X��Г��ʑ��:w����V��6Z6gw5�G��	������0��tG�c��wn��ɬ��qך���l��;����Z�|&#�e;�GyN�%Z�3٪��-��"1#�$��ݎ�\-���gG�����/�v7��5�S4N�|o��B��3�����H���7j��oh\C���a�0и|k���v׭�qE���O|��I}�5ҝp�0��d䅍R���I�ެ���4Mʒ���v�nN��Uc1��(>�$#� ��Ol�4�mZ���8��hR9�k�𿛬liR�R�M__ܓe�}iݳ�Z���4�2�Fd#�������1>>�	����H��vt7�������*���ݺ�{�Τ�_�5z&��^���؏H���M�wF;�~��X	�/;M�E�����E�Ѹ/;�q���{�d/�Pك��,����l���w�d�:����4���ة6d� ����U��:YIj�m��i�$���"u����p2#�#R�N��&��яBќ�,�7'�M14�����^���_��������f��O� �QQ�ǎ�99�Z�n���vDuv�ǉq^~c	۪���Ũ:ZD��n��E��׏1�n�M?�����E�l����7�D��.22ߊ�neC���+shQ�F6v2���j	C����}'-��x�*Ҩ��e��O��N�e�-�j����f�6$��ɪM!���Zf�#[��~wk�8$�Q���!�p�j+޵zY�Z�0ΒVѬ������٪�|�UB ��R�Hk�U��:Z�dI��Z���qUz�F�V$�U� A�[���$����6n��ɷ;�e������D'�(��nx�d7�H�#��n�<�6B{4d�fl������*-���'����ţꮰ��:4(�VD� #'Ov۟Ů�H1��,~
 �AE��2s��"K%`�eE�[� �h1-���K�l�P2��	��\�#�]N~5�_z���^?�[3�BO� ��4�֪!�M�Zog�~H����*�k�-�l+��M�	ز^S�;LrP��TspՀvG�#;�]}5-=+'�i��ڏ<a����K�Q�V�S؟�8�G\v(ع�98ɜ�yf98	�S�o��(����2����g��'����{���@J�6z��`$ �uM���g��"I�A�?�y��;�/���C�@\�.sH�'��/�n��	��b�V�1 � �r�?�������)ϧ;����l�����Fq�K�=,�	�y[���R��lT�g+ȹ�CN�R�P?Q�(U��䏍���7�de�_?�7�����09�=~D4�B�`VP�,��n`�����1Yę���t1�>pW?� 1_��90�"�s�ݗ�`���Q-��;�r�j���G/��nU����%M-����A�F^ gd�b9�	$ؿ�j��TEI���@�S ?) � ����C-o�pA��R�i+��      8      x������ � �      9   �  x���Mo�0�3�+����l>�������P)Re���	0���k�J�n��H��0<������)�w���Т��ay.���7ҧ��+�ۻ��68��tk�g��s��Ə����lw�XO���;��Ex�{�эf0�CeA7�u�-I�~궵�G|��%��}��6X�F�K��{3ƻ�/��s��<^;x�3�I��|Fy�����~0��~��>�^���T�"B?PE�(aJ)V�P�ҵ�b����gBE���L����T�¤��^����žcx_���-��4Z�|��eJ	W�b3��p�U��c��kx,b��T�+K�Ι��E��Z�t�����a��o�T�eQ��e�J����e���Χk	�$����ߌn�2g���h�����A+��a^��)�����p�{�}��(��'��l�  54a      ;      x������ � �      =   �   x�}ͻ�0 @љ~��ZG�!�4�ƥ�Hi�#�J��uЕ��\h)�O��VU�,1:v)�V�J����c�&
��q��nX0�Q�9��|�Ɨ[�v���ߊ������kFN���������*M��p��]'���2p#Z�w|�«�l�� �΋E     